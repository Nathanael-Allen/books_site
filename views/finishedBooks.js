import { returnAllBooks } from "../database/database.cjs";

async function getFinishedBooks(){
    const books = await returnAllBooks();
    let bookDivs = /*html*/`
    `;

    let mainList = /*html*/`
        <h4>Finished Books</h4>
    `;

    books.forEach((book) => {
        let html = /*html*/`
            <li>
                <div>
                    <p>Title: ${book['TITLE']}</p>
                    <p>Author: ${book['AUTHOR']}</p>
                    <p>Rating: ${book['RATING']}</p>
                </div>
            </li>
        `;
        bookDivs += html;
    })
    
    mainList += /*html*/`
        <ul>
            ${bookDivs}
        </ul> 
    `;

    return mainList
}

getFinishedBooks().then((books) => console.log(books))

export {getFinishedBooks}