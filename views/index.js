async function CreateIndexPage(){
    return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://unpkg.com/htmx.org@2.0.2" integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ" crossorigin="anonymous"></script>
        <script src="/main.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>My Book List</title>
    </head>
    <body class="bg-gray-900 text-white">
        <header class="bg-gray-800 text-white sticky top-0 max-sm:m">
            <div class="sm:hidden text-right w-full">
                <button id="menu-button" class="pr-4">
                    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L4 7" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20 12L4 12" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20 17L4 17" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <ul id="nav-list" class="max-sm:hidden sm:flex sm:flex-auto max-sm:text-center">
                <li class="max-sm:border-t">
                    <button hx-get="/books/reviews" hx-target="#main-div" class="text-l sm:border-r sm:border-white px-4 my-3 hover:text-sky-500 max-sm:w-full">Reviews</button>
                </li>
                <li class="max-sm:border-t">
                    <button hx-get="/books/readinglist" hx-target="#main-div" class="text-l sm:border-r sm:border-white px-4 my-3 hover:text-sky-500 max-sm:w-full">Reading List</button>
                </li>
                <li class="max-sm:border-t">
                    <button hx-get="/admin/dashboard" hx-target="#main-div" class="text-l sm:border-r sm:border-white px-4 my-3 hover:text-sky-500 max-sm:w-full">Admin Dashboard</button>
                </li>
            </ul>
        </header>   
        <div id="main-div">
 
        </div>
    </body>
    </html>
    `
}

export {CreateIndexPage}