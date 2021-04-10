import Head from 'next/head'
import {Link} from '../routes';
import * as React from "react";
import {server} from '../config/config';
import {bookListStyles} from "../public/styles";


export const getServerSideProps = async () => {
    const request = new Request(`${server}/api/books`, {
        method: 'GET',
        headers: new Headers()
    })
    const props = await fetch(request)
        .then((res) => res.json())
        .then((books) => {
            return {
                message: '',
                error: null,
                books: books
            }
        })
        .catch((e) => {
            console.log(e)
            return {
                message: 'Something went wrong!',
                error: e.message,
                books: null
            }
        })
    return {
        props: props,
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {books: props.books}
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>Библиотека</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Link href={{pathname: "/admin"}}>
                    <button style={{position: "fixed", top: "10px", left: "10px", display: "block"}}>Режим админа
                    </button>
                </Link>

                <main>
                    {(this.props.books === undefined)
                        ? <h1>Loading...</h1>
                        : (this.props.error !== null && this.props.books == null) ?
                            <div className="message">
                                <p>{this.props.message}</p>
                                <p>Ошибка: {this.props.error}</p>
                            </div>
                            : <ol id="books-list">
                                {this.state.books.map(book =>
                                    <li>
                                        <h2>{book.title}</h2>
                                        <div className="book-info">
                                            <img className="book-cover"
                                                 src={(book.cover.length !== 0) ? "/upload/" + book.id + "_" + book.cover : "/upload/default.jpeg"}
                                                 alt="book1 cover"/>
                                            <div className="book-info-text">
                                                <p>{book.averageRating.toPrecision(2)} из 5 (5 отзывов)</p>
                                                <p>{book.description}</p>
                                                <Link href={{pathname: `/book/${book.id}`, query: {tab: "1"}}}>
                                                    <a className="Link">Отзывы</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ol>
                    }
                </main>
                <style jsx>{bookListStyles}</style>
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

export default Home;
