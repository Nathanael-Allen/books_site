import { returnFinishedBooks } from "../database/database.cjs";

async function getFinishedBooks(){
    const books = await returnFinishedBooks();
    let bookDivs = /*html*/`
    `;

    let mainList = /*html*/`
        <h4 class="font-bold text-lg">Finished Books</h4>
    `;

    books.forEach((book)=>{
        let html = /*html*/`
        <li>
            <div class="my-2">
                <p class="font-semibold text-lg">Title: ${book['TITLE']}</p>
                <p class="font-semibold">Author: ${book['AUTHOR']}</p>
                <p>Rating: ${book['RATING'] ? book['RATING'] : 'no-rating'}/10</p>
                <p>Review: ${book['REVIEW'] ? book['REVIEW'] : ''}</p>
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

export {getFinishedBooks}