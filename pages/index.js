import Head from 'next/head'
import {Link} from '../routes';
import * as React from "react";
import {server} from '../config/config';


export const getServerSideProps = async () => {
    const request = new Request(`${server}/api/books`, {
        method: 'GET',
        headers: new Headers()
    })
    const res = await fetch(request)
    const books = await res.json()
    return {
        props: {books},
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
                    {this.props.books === undefined
                        ? <h1>Loading...</h1>
                        :
                        <ol id="books-list">
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
                  
                  .Link:hover{
                    text-decoration: underline;
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

export default Home;
