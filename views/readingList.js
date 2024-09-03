import { getReadingList } from "../database/database.cjs";


async function readingList(){
    let readingList = await getReadingList();
    let html = /*html*/``

    readingList.forEach((book)=>{
        let div = /*html*/`
            <div class="bg-gray-800 flex items-center w-full my-4 p-2 rounded-lg max-sm:flex-col" >
                <p class="px-2 font-xl font-bold">${book['TITLE']}</p>
                <p class="px-2 font-lg">${book['AUTHOR']}</p>
                <button class="text-white p-2 flex bg-sky-500 items-center rounded-lg hover:bg-sky-800 sm:ml-auto max-sm:mt-4"> 
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g>
                    </svg>
                    Review
                </button>
            </div>
        `;
        html += div;
    }); 

    return /*html*/`
        <div class="w-2/4 m-auto max-sm:w-full">
            <h4 class="font-bold text-4xl py-2 mb-6 border-b w-full text-center">Reading List</h4>
            ${html}
        </div>
    `;
};

export { readingList }