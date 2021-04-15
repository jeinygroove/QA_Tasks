import React from "react";
import Head from "next/head";
import {Link} from "../../routes";
import {server} from '../../config/config';
import {addBookStyles} from "../../public/styles";

const getSignature = async () => {
    const response = await fetch("/api/signGen");
    const data = await response.json();
    return data;
};


export default class addBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            coverFileName: '',
            link: '',
            description: '',
            coverFile: undefined,
            message: '',
        }
        this.changeTitle = (e) => {
            e.preventDefault()
            this.setState({
                title: e.target.value,
                message: ''
            })
        }
        this.changeCover = (e) => {
            e.preventDefault()
            this.setState({
                coverFileName: e.target.files[0].name,
                coverFile: e.target.files[0],
                message: ''
            })
        }
        this.changeLink = (e) => {
            e.preventDefault()
            this.setState({
                link: e.target.value,
                message: ''
            })
        }
        this.changeDescription = (e) => {
            e.preventDefault()
            this.setState({
                description: e.target.value,
                message: ''
            })
        }
        this.addBook = async (e) => {
            e.preventDefault()
            if (this.state.description.length === 0 || this.state.description.length > 256) {
                this.setState({
                    message: 'Что-то пошло не так!'
                })
            } else {
                const state = this.state;
                try {
                    const { signature, timestamp } = await getSignature();

                    const data = new FormData();

                    data.append("file", state.coverFile);
                    data.append("signature", signature);
                    data.append("timestamp", timestamp);
                    data.append("api_key", process.env.NEXT_PUBLIC_API_Key);

                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                        {
                            method: "POST",
                            body: data,
                        }
                    );

                    const cloudinary_image_uploaded = await response.json();

                    const l = state.description.length
                    const body = {
                        title: state.title,
                        coverFileName: cloudinary_image_uploaded.public_id,
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

                    this.myFormRef.reset();
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
                    <form ref={(el) => this.myFormRef = el}>
                        <label>Название:</label>
                        <input onChange={this.changeTitle} className="add-book-input" placeholder="Placeholder"/>
                        <label>Ссылка на книгу:</label>
                        <input onChange={this.changeLink} className="add-book-input" placeholder="Placeholder"/>
                        <label>Обложка книги:</label>
                        <input onChange={this.changeCover} type="file" accept="image/jpeg"/>
                        <label>Описание:</label>
                        <textarea onChange={this.changeDescription}
                                  style={{marginTop: "20px", width: "100%", height: "150px"}}
                                  placeholder="Type here"/>
                        <div/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <p>{this.state.message}</p>
                            <button onClick={this.addBook}
                                    style={{justifySelf: "end", margin: "10px", padding: "5px 10px"}}>Добавить
                            </button>
                        </div>
                    </form>
                </main>

                <style jsx>{addBookStyles}</style>

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
