import React from "react";
import Head from "next/head";
import {Link} from "../../routes";
import {server} from '../../config/config';
import {booksTable} from "../../public/styles";

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.fetchBooks = async () => {
            const request = new Request(`${server}/api/books`, {
                method: 'GET',
                headers: new Headers()
            })
            await fetch(request)
                .then((res) => res.json())
                .then((books) => {
                    this.setState({
                        books: books,
                        message: null
                    })
                })
                .catch((e) => {
                    this.setState({
                        books: null,
                        message: 'Something went wrong!'
                    })
                })
        }
        this.deleteBook = async (e, id) => {
            e.preventDefault()
            const res = await fetch(`${server}/api/books/${id}`, {
                method: 'DELETE'
            }).then(() => {
                this.fetchBooks()
            }).catch((e) => this.setState({message: 'Something went wrong!'}))
        }
    }

    async componentDidMount() {
        await this.fetchBooks();
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>Новая книга</title>
                    <link rel="icon" href="../favicon.ico"/>
                </Head>

                <Link href={{pathname: "/"}}>
                    <button style={{position: "fixed", top: "10px", left: "10px", display: "block"}}>Режим пользователя
                    </button>
                </Link>

                {this.state.message !== null ? <main><p>{this.state.message}</p></main> :
                    <main>
                        <Link href={{pathname: "/admin/addBook"}}>
                            <h1 className="Link">Добавить книгу</h1>
                        </Link>

                        <h1>Список книг</h1>
                        <table>
                            <thead>
                            <tr>
                                <th style={{width: "40%"}}>Книга</th>
                                <th>Описание</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.books.map(book =>
                                    <tr>
                                        <td>
                                            <div>{book.title}</div>
                                        </td>
                                        <td>
                                            <div>{book.description}</div>
                                        </td>
                                        <td>
                                            <div onClick={(e) => this.deleteBook(e, book.id)}><a>delete</a></div>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </main>}

                <style jsx>{booksTable}</style>

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
