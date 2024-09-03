function reviewHeader(){
    return /*html*/`
    <h4 class="font-bold text-4xl py-2 border-b w-full text-center">Reviews</h4>
    <div class="flex w-full justify-center items-center pt-4">
        <input class="w-3/4 text-black rounded-lg p-1 mt-2 mb-6 focus:outline-none focus:ring focus:ring-sky-500" id="search-bar" placeholder="Search..." type="search" name="search-bar" hx-post="/books/search" hx-trigger="input changed delay:500ms" hx-target="#main-div" hx-preserve="true" autocomplete="off" autofocus>
    </div>
    `;
};

export { reviewHeader };