import Head from 'next/head'
import React from 'react';
import {withRouter} from 'next/router';
import {Link} from "../../routes";
import {Tab, TabBody, TabContainer, TabHead, reviewFormStyles, bookStyles} from "../../public/styles";
import {server} from "../../config/config";

export const getServerSideProps = async (context) => {
    if (context.params?.index !== undefined) {
        const bookId = Number(context.params?.index)
        return {
            props: {bookId: bookId},
        }
    } else {
        return {
            props: {bookId: -1}
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
                stars: s,
                message: ''
            })
        }
        this.changeText = (e) => {
            e.preventDefault()
            this.setState({
                text: e.target.value,
                message: ''
            })
        }
        this.changeName = (e) => {
            e.preventDefault()
            this.setState({
                name: e.target.value,
                message: ''
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
                    <input value={this.state.name} onChange={this.changeName} id="review-name-input" placeholder="Имя"
                           required/>
                    <div className="rating rating2">
                        <a className={(this.state.stars >= 5) ? "is-orange" : "not-orange"}
                           onClick={(e) => this.setStars(e, 5)} href="#5" title="Give 5 stars">★</a>
                        <a className={(this.state.stars >= 4) ? "is-orange" : "not-orange"}
                           onClick={(e) => this.setStars(e, 4)} href="#4" title="Give 4 stars">★</a>
                        <a className={(this.state.stars >= 3) ? "is-orange" : "not-orange"}
                           onClick={(e) => this.setStars(e, 3)} href="/#3" title="Give 3 stars">★</a>
                        <a className={(this.state.stars >= 2) ? "is-orange" : "not-orange"}
                           onClick={(e) => this.setStars(e, 2)} href="/#2" title="Give 2 stars">★</a>
                        <a className={(this.state.stars >= 1) ? "is-orange" : "not-orange"}
                           onClick={(e) => this.setStars(e, 1)} href="/#1" title="Give 1 star">★</a>
                    </div>
                </div>
                <textarea value={this.state.text} onChange={this.changeText}
                          style={{marginTop: "20px", width: "100%", height: "150px"}}/>
                <div style={{
                    height: "70px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingBottom: "30px",
                    alignItems: "center"
                }}>
                    <p style={{paddingRight: "10px"}}>{this.state.message}</p>
                    <button onClick={(e) => this.sendReview(e)} style={{padding: "5px 10px"}}>Отправить</button>
                </div>
                <style jsx>{reviewFormStyles}</style>
            </form>
        )
    }

}

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            book: undefined,
            message: null
        }
        this.mounted = true;
        this.fetchBook = async () => {
            if (this.props.bookId !== undefined) {
                const requestBooks = new Request(`${server}/api/books/${this.props.bookId}`, {
                    method: 'GET',
                    headers: new Headers()
                })
                const book = await fetch(requestBooks)
                    .then((res) => res.json())
                    .catch((e) => {
                        console.log(e)
                        this.setState({
                            message: 'Something went wrong!',
                            book: null
                        })
                        return null
                    })
                if (this.mounted && book !== null) {
                    this.setState({
                        book: book,
                        message: null
                    })
                }
            }
        }
        this.fetchReviews = async () => {
            const bookId = Number(props.bookId)
            const requestReviews = new Request(`${server}/api/reviews/${bookId}`, {
                method: 'GET',
                headers: new Headers()
            })
            const reviews = await fetch(requestReviews)
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e)
                    this.setState({
                        message: 'Something went wrong!',
                        reviews: null
                    })
                    return null
                })
            if (this.mounted && reviews != null) {
                this.setState({
                    reviews: reviews,
                    message: null
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

    componentWillUnmount() {
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

                <main> {(this.state.message !== null) ?
                    <p style={{margin: "50px"}}>{this.state.message}</p>
                    : (i === undefined || this.state.book === undefined) ? <h1>Loading...</h1>
                        :
                        <div id="book-info-with-reviews" style={{marginBottom: "20px"}}>
                            <h1>{this.state.book.title}</h1>
                            <div className="book-info">
                                <img className="book-cover"
                                     src={(this.state.book.cover.length !== 0) ? "/upload/" + this.state.book.id + "_" + this.state.book.cover : "/upload/default.jpeg"}/>
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
                                                    style={{
                                                        border: "1px solid",
                                                        borderRadius: "10px",
                                                        padding: "5px",
                                                        margin: "10px 0"
                                                    }}>
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

                <style jsx>{bookStyles}</style>

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
