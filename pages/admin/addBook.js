import React from "react";
import Head from "next/head";
import {Link} from "../../routes";
import {server} from "../../config/config";
import axios from "axios";

export default class addBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: '', coverFileName: '', link: '', description: '', message: '', coverFile: undefined}
        this.changeTitle = (e) => {
            e.preventDefault()
            this.setState({
                title: e.target.value
            })
        }
        this.changeCover = (e) => {
            e.preventDefault()
            this.setState({
                coverFileName: e.target.files[0].name,
                coverFile: e.target.files[0]
            })
        }
        this.changeLink = (e) => {
            e.preventDefault()
            this.setState({
                link: e.target.value
            })
        }
        this.changeDescription = (e) => {
            e.preventDefault()
            this.setState({
                description: e.target.value
            })
        }
        this.addBook = async (e) => {
            e.preventDefault()
            if (this.state.description.length === 0 || this.state.description.length > 256) {
                this.setState({
                    message: 'Что-то пошло не так!'
                })
            } else if (this.state.description.length > 256) {
                this.setState({
                    message: 'Много символов в описании!'
                })
            } else {
                const state = this.state;
                try {
                    const l = state.description.length
                    const body = {
                        title: state.title,
                        coverFileName: state.coverFileName,
                        description: state.description.slice(0, Number(l / 2)),
                        descriptionLong: state.description
                    }
                    const res = await fetch(`${server}/api/books/add`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: 'POST',
                        body: JSON.stringify(body),
                    }).then((res) => res.json())
                    const data = new FormData()
                    data.append("file", state.coverFile, res.id.toString() + "_" + state.coverFileName)
                    const response = await axios.post(`${server}/api/books/addImage`, data);
                } catch (error) {
                    this.setState({
                        message: error.message
                    })
                }
            }
        }
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
                    <h1>Добавить книгу</h1>
                    <form>
                        <label>Название:</label>
                        <input onChange={this.changeTitle} className="add-book-input" placeholder="Placeholder"/>
                        <label>Ссылка на книгу:</label>
                        <input onChange={this.changeLink}  className="add-book-input" placeholder="Placeholder"/>
                        <label>Обложка книги:</label>
                        <input onChange={this.changeCover} type="file" accept="image/jpeg"/>
                        <label>Описание:</label>
                        <textarea onChange={this.changeDescription} style={{marginTop: "20px", width: "100%", height: "150px"}} placeholder="Type here"/>
                        <div/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <p>{this.state.message}</p>
                            <button onClick={this.addBook} style={{justifySelf: "end", margin: "10px", padding: "5px 10px"}}>Добавить</button>
                        </div>
                    </form>
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
                  
                  .add-book-field {
                    display: flex;
                    flex-direction: row;
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

                  #book-info-with-reviews {
                    width: 800px;
                    vertical-align: top;
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
