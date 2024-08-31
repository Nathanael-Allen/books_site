async function CreateIndexPage(){
    return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://unpkg.com/htmx.org@2.0.2" integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ" crossorigin="anonymous"></script>
        <script src="/index.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>My Book List</title>
    </head>
    <body class="bg-gray-900 text-white">
        <header class="bg-gray-800 text-white max-sm:m">
            <div class="sm:hidden text-right w-full">
            <button id="menu-button">
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                <path d="M20 7L4 7" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M20 12L4 12" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M20 17L4 17" stroke="#ecfeff" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
            </div>
            <ul id="nav-list" class="max-sm:hidden sm:flex sm:flex-auto sm:justify-evenly">
                <li><button hx-get="/books/finished" hx-target="#main-div" class="text-lg">Finished Books</button></li>
                <li><button hx-get="/books/unread" hx-target="#main-div" class="text-lg">Unread Books</button></li>
                <li><button hx-get="/admin/dashboard" hx-target="#main-div" class="text-lg">Admin Dashboard</button></li>
            </ul>
        </header>        
        <div id="main-div" class="">
        </div>
    </body>
    </html>
    `
}

export {CreateIndexPage}