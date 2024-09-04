function addReview(){
    return /*html*/`
        <form class="sm:w-3/4 m-auto bg-gray-800 p-4 flex flex-col items-center justify-center mt-4 rounded-lg">
            <h4 class="font-semibold text-xl border-b text-center w-2/3 mb-4">Add Review</h4>
            <input placeholder="Title" class="w-2/3 text-black rounded-lg p-1 mt-2 mb-6 focus:outline-none focus:ring focus:ring-sky-500" type="text" name="title", id="title" autocomplete="off">
            <input placeholder="Author" class="w-2/3 text-black rounded-lg p-1 mt-2 mb-6 focus:outline-none focus:ring focus:ring-sky-500" type="text" name="author", id="author" autocomplete="off">
            <input placeholder="Rating" class="w-2/3 text-black rounded-lg p-1 mt-2 mb-6 focus:outline-none focus:ring focus:ring-sky-500" type="number" name="rating", id="rating" autocomplete="off">
            <textarea placeholder="Review" class="w-2/3 resize-none text-black rounded-lg p-1 mt-2 mb-6 focus:outline-none focus:ring focus:ring-sky-500" type="text" name="review", id="review"></textarea>
            <button class="text-white p-2 flex bg-sky-500 items-center rounded-lg hover:bg-sky-800 max-sm:mt-4">Submit</button>
        </form>
    `;
};

export { addReview }