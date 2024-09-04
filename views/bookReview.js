async function bookReview(callback){
    const books = await callback;
    let bookList = /*html*/``
    books.forEach((book)=>{
        let html = /*html*/`
        <li>
            <div class="max-sm:block rounded-lg bg-gray-800 grid grid-cols-3 my-8">
                <div class="p-4">
                    <p class="font-semibold text-sky-500 text-xl col-start-1 pb-1">${book['TITLE']}</p>
                    <p class="col-start-1">${book['AUTHOR']}</p>
                    <p class="col-start-1 pt-4">${book['RATING'] ? book['RATING'] : '0'}/10</p>
                </div>
                <p class="col-start-2 col-span-2 row-start-1 overflow-scroll p-4">${book['REVIEW'] ? book['REVIEW'] : ''}</p>
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

export { bookReview };