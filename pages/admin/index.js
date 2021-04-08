import React from "react";
import Head from "next/head";
import {Link} from "../../routes";
import {server} from '../../config/config';

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

            const res = await fetch(request)
            const books = await res.json()
            this.setState({
                books: books
            })
        }
        this.deleteBook = async (e, id) => {
            e.preventDefault()
            const res = await fetch(`${server}/api/books/${id}`, {
                method: 'DELETE'
            }).then(() => {
                this.fetchBooks()
            })
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
                    height: 100vh;
                    display: inline;
                  }

                  main > form {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    grid-column-gap: 10px;
                    grid-row-gap: 10px;
                  }

                  label {
                    margin-right: 20px;
                  }

                  table, th, td {
                    border-collapse: collapse;
                    border: 1px solid black;
                    padding: 5px;
                  }

                  td div {
                    height: 26px;
                    overflow: hidden;
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

                  .Link:hover {
                    text-decoration: underline;
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
