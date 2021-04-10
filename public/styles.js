import styled from "@emotion/styled"
import {css} from "styled-jsx/css";

export const PageBody = styled("div")`
  width: 100%;
  height: 100%;
  padding: 2em;
`

export const TabHead = styled("div")`
  border-bottom: 1px solid white;
  display: flex;
  background: white;
`
export const TabContainer = styled("div")`
  margin-top: 30px;
`
export const TabBody = styled(PageBody)`
  height: 100%;
  padding: 0;
`
export const Tab = styled("div")`
  padding: 5px 40px 5px 40px;
  border: 1px solid black;
  border-radius: 10px 10px 0 0;
  background: ${({selected}) => (selected ? "grey" : "white")};

  * {
    color: white;
  }
`

export const bookListStyles = css`
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

  .message {
    padding-top: 50px
  }

  .Link:hover {
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
  }`

export const reviewFormStyles = css`
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
`

export const bookStyles = css`
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
`

export const booksTable = css`
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
`

export const addBookStyles = css`
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
`
