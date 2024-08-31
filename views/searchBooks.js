import { searchDB } from "../database/database.cjs";

async function searchResults(search){
    const books = await searchDB(search);
    let bookList = /*html*/``
    books.forEach((book)=>{
        let html = /*html*/`
        <li>
            <div class="max-sm:block my-2 border border-gray-400 rounded-md bg-gray-800 grid grid-cols-3 my-7">
                <div>
                    <p class="font-semibold text-lg col-start-1 text-sky-500 p-4 max-sm:text-center">${book['TITLE']}</p>
                    <p class="col-start-1 p-4 max-sm:text-center">${book['AUTHOR']}</p>
                    <p class="col-start-1 p-4 max-sm:text-center">${book['RATING'] ? book['RATING'] : ''}/10</p>
                </div>
                <p class="col-start-2 col-span-2 row-start-1 overflow-scroll py-2 max-sm:px-7">${book['REVIEW'] ? book['REVIEW'] : ''}</p>
            </div>
        </li>
        `;
        bookList += html;
    });

    return /*html*/`
    <ul class="max-lg:block w-full">
        ${bookList}
    </ul> 
    `;
};

async function getSearchList(search){
    let bookList = await searchResults(search);

    let header = /*html*/`
        <h4 class="font-bold text-2xl text-center mt-4">Finished Books</h4>
        <div class="flex w-full justify-center items-center">
            <label for="search-bar" class="pr-2">Search:</label>
            <input class="w-2/4 text-black" id="search-bar" type="search" name="search-bar" hx-post="/books/search" hx-trigger="input changed delay:500ms" hx-target="#main-div" hx-preserve="true" autocomplete="off" autofocus>
        </div>
    `;

    let mainDiv = /*html*/`
        <div class="flex flex-col md:w-2/3 justify-center items-center md:m-auto">
            ${header}
            ${bookList}
        </div>
    `;

    return mainDiv
} 

export {getSearchList}