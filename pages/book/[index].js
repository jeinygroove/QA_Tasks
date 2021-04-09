import Head from 'next/head'
import React from 'react';
import {withRouter} from 'next/router';
import {Link} from "../../routes";
import {Tab, TabBody, TabContainer, TabHead} from "../../public/styles";
import {server} from "../../config/config";

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async (context) => {
    if (context.params?.index !== undefined) {
        const bookId = Number(context.params?.index)
        return {
            props: {bookId: bookId},
        }
    } else {
        return {
            props: {}
        }
    }
};

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {book: props.book, stars: -1, text: '', name: '', message: ''}
        this.setStars = (e, s) => {
            e.preventDefault()
            this.setState({
                stars: s
            })
        }
        this.changeText = (e) => {
            e.preventDefault()
            this.setState({
                text: e.target.value
            })
        }
        this.changeName = (e) => {
            e.preventDefault()
            this.setState({
                name: e.target.value
            })
        }
        this.sendReview = async (e) => {
            e.preventDefault()
            const stars = this.state.stars;
            if (this.state.name.length === 0 || stars === -1 || this.state.text.toLowerCase().search(/[a-z]/i) !== -1) {
                this.setState({
                    message: 'Что-то пошло не так!'
                })
                return;
            }
            const body = {
                name: this.state.name,
                text: this.state.text,
                stars: this.state.stars,
                bookId: this.props.book.id,
            }
            await fetch(`${server}/api/reviews/add`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(body),
            }).then(() => {
                props.handleAfterSubmit()
                this.setState({
                    book: props.book, stars: -1, text: '', name: '', message: ''
                })
            })
        }
    }

    render() {
        return (
            <form>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <input value={this.state.name} onChange={this.changeName} id="review-name-input" placeholder="Имя" required/>
                    <div className="rating rating2">
                        <a className={(this.state.stars >= 5) ? "is-orange" : "not-orange"} onClick={(e) => this.setStars(e, 5)} href="#5" title="Give 5 stars">★</a>
                        <a className={(this.state.stars >= 4) ? "is-orange" : "not-orange"} onClick={(e) => this.setStars(e, 4)} href="#4" title="Give 4 stars">★</a>
                        <a className={(this.state.stars >= 3) ? "is-orange" : "not-orange"} onClick={(e) => this.setStars(e, 3)} href="/#3" title="Give 3 stars">★</a>
                        <a className={(this.state.stars >= 2) ? "is-orange" : "not-orange"} onClick={(e) => this.setStars(e, 2)} href="/#2" title="Give 2 stars">★</a>
                        <a className={(this.state.stars >= 1) ? "is-orange" : "not-orange"} onClick={(e) => this.setStars(e, 1)} href="/#1" title="Give 1 star">★</a>
                    </div>
                </div>
                <textarea value={this.state.text} onChange={this.changeText} style={{marginTop: "20px", width: "100%", height: "150px"}}/>
                <div style={{height: "70px", display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingBottom: "30px", alignItems: "center"}}>
                    <p style={{paddingRight: "10px"}}>{this.state.message}</p>
                    <button onClick={(e) => this.sendReview(e)} style={{ padding: "5px 10px"}}>Отправить</button>
                </div>
                <style jsx>{`
                  .rating {
                    width: 226px;
                    font-size: 45px;
                    overflow: hidden;
                  }

                  .rating input {
                    float: right;
                    opacity: 0;
                    position: absolute;
                  }

                  .is-orange {
                    color: orange;
                    cursor: pointer;
                  }

                  .not-orange {
                    color: #aaa;
                    cursor: pointer;
                  }

                  .rating a,
                  .rating label {
                    float: right;
                    text-decoration: none;
                    -webkit-transition: color .4s;
                    -moz-transition: color .4s;
                    -o-transition: color .4s;
                    transition: color .4s;
                  }

                  .rating label:hover ~ label,
                  .rating input:focus ~ label,
                  .rating label:hover,
                  .rating a:hover,
                  .rating a:hover ~ a,
                  .rating a:focus,
                  .rating a:focus ~ a {
                    color: orange;
                    cursor: pointer;
                  }

                  .rating2 {
                    direction: rtl;
                  }

                  .rating2 a {
                    float: none
                  }
                `}</style>
            </form>
        )
    }

}

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            book: undefined
        }
        this.mounted = true;
        this.fetchBook = async () => {
            if (this.props.bookId !== undefined) {
                const requestBooks = new Request(`${server}/api/books/${this.props.bookId}`, {
                    method: 'GET',
                    headers: new Headers()
                })
                const resBooks = await fetch(requestBooks)
                const book = await resBooks.json()
                if (this.mounted || isSubmit) {
                    this.setState({
                        book: book
                    })
                }
            }
        }
        this.fetchReviews = async (isSubmit = false) => {
            const bookId = Number(props.bookId)
            const requestReviews = new Request(`${server}/api/reviews/${bookId}`, {
                method: 'GET',
                headers: new Headers()
            })
            const resReviews = await fetch(requestReviews)
            const resp = await resReviews.json()
            if (this.mounted || isSubmit) {
                this.setState({
                    reviews: resp
                })
            }
        }
        this.handleAfterSubmit = () => {
            this.fetchBook(true);
            this.fetchReviews(true)
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.fetchBook();
        this.fetchReviews();
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render() {
        const {router} = this.props;
        const i = router.query.index;
        const {
            query: {tab}
        } = router

        const isTabOne = tab === "1" || tab == null
        const isTabTwo = tab === "2"

        return (
            <div className="container">
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>Книга</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Link href={{pathname: "/admin"}}>
                    <button style={{position: "fixed", top: "10px", left: "10px", display: "block"}}>Режим админа
                    </button>
                </Link>

                <main>
                    {i === undefined || this.state.book === undefined
                        ? <h1>Loading...</h1>
                        :
                        <div id="book-info-with-reviews" style={{marginBottom: "20px"}}>
                            <h1>{this.state.book.title}</h1>
                            <div className="book-info">
                                <img className="book-cover" src={(this.state.book.cover.length !== 0) ? `/api/books/getImage?img=${this.state.book.id}-${this.state.book.cover}` : "/upload/default.jpeg"}/>
                                <div className="book-info-text">
                                    <p>{this.state.book.averageRating.toPrecision(2)} из 5 (5 отзывов)</p>
                                    {isTabOne &&
                                    <button className="read-button">Читать</button>
                                    }
                                </div>
                            </div>
                            <TabContainer>
                                <TabHead>
                                    <Tab selected={isTabOne}>
                                        <Link href={{pathname: "/book/" + i, query: {tab: "1"}}}>
                                            <a>Описание</a>
                                        </Link>
                                    </Tab>
                                    <Tab selected={isTabTwo}>
                                        <Link href={{pathname: "/book/" + i, query: {tab: "2"}}}>
                                            <a>Отзывы</a>
                                        </Link>
                                    </Tab>
                                </TabHead>
                                <TabBody>
                                    {isTabOne && <div>
                                        <p style={{whiteSpace: "pre-line"}}>{this.state.book.descriptionLong}</p>
                                        <h3>Отзывы</h3>
                                        <ReviewForm book={this.state.book} handleAfterSubmit={this.handleAfterSubmit}/>
                                    </div>}
                                    {isTabTwo && <div>
                                        <h3>Оставить отзыв</h3>
                                        <ReviewForm book={this.state.book} handleAfterSubmit={this.handleAfterSubmit}/>
                                        {this.state.reviews.flatMap(review => {
                                            return (
                                                <div
                                                    style={{border: "1px solid", borderRadius: "10px", padding: "5px", margin: "10px 0"}}>
                                                    <p>{review.name} добавил(а) отзыв</p>
                                                    <p>{review.text}</p>
                                                    <p>Оценка: {review.stars}/5</p>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                </TabBody>
                            </TabContainer>
                        </div>
                    }
                    <div style={{height: "20px"}}/>
                </main>

                <style jsx>{`
                  .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }

                  main {
                    width: 800px;
                    padding: 0;
                    display: inline !important;
                    height: 100vh;
                  }

                  #book-info-with-reviews {
                    width: 800px;
                    vertical-align: top;
                  }

                  #books-list {
                    list-style: none;
                  }

                  .book-info {
                    display: flex;
                    flex-direction: row;
                  }

                  .book-info-text {
                    display: flex;
                    flex-direction: column;
                  }

                  .book-cover {
                    width: 150px;
                    height: auto;
                    margin-right: 30px;
                  }

                  .read-button {
                    padding: 15px 45px 15px 45px;
                  }

                  footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  footer img {
                    margin-left: 0.5rem;
                  }

                  footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  a {
                    color: inherit;
                    text-decoration: none;
                  }

                  .title a {
                    color: #0070f3;
                    text-decoration: none;
                  }

                  .title a:hover,
                  .title a:focus,
                  .title a:active {
                    text-decoration: underline;
                  }

                  .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                  }

                  .title,
                  .description {
                    text-align: center;
                  }

                  .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                  }

                  code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                  }

                  .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                  }

                  .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                  }

                  .card:hover,
                  .card:focus,
                  .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                  }

                  .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                  }

                  .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                  }

                  .logo {
                    height: 1em;
                  }

                  @media (max-width: 600px) {
                    .grid {
                      width: 100%;
                      flex-direction: column;
                    }
                  }
                `}</style>

                <style jsx global>{`
                  html,
                  body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                  }

                  * {
                    box-sizing: border-box;
                  }
                `}</style>
            </div>
        )
    }
}

export default withRouter(Book);
