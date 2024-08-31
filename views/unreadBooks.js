import { returnUnfinishedBooks } from "../database/database.cjs";

async function getUnfinishedBooks(){
    const books = await returnUnfinishedBooks();
    let bookDivs = /*html*/`
    `;

    let mainList = /*html*/`
        <h4 class="font-bold text-lg">Unread Books</h4>
    `;

    books.forEach((book)=>{
        let html = /*html*/`
        <li>
            <div class="my-2">
                <p class="font-semibold text-lg">Title: ${book['TITLE']}</p>
                <p class="font-semibold">Author: ${book['AUTHOR']}</p>
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