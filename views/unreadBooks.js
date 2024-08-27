import { returnUnfinishedBooks } from "../database/database.cjs";

async function getUnfinishedBooks(){
    const books = await returnUnfinishedBooks();
    let bookDivs = /*html*/`
    `;

    let mainList = /*html*/`
        <h4>Unread Books</h4>
    `;

    books.forEach((book)=>{
        let html = /*html*/`
        <li>
            <div>
                <p>Title: ${book['TITLE']}</p>
                <p>Author: ${book['AUTHOR']}</p>
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

export {getUnfinishedBooks}