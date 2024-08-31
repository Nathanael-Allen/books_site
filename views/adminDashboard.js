function createAdminPage(){
    return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://unpkg.com/htmx.org@2.0.2" integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ" crossorigin="anonymous"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>My Book List</title>
    </head>
    <body id="add-book-body">
        <header>
            <ul>
                <li><button hx-get="/books/add/unread">Add Book To Read</button></li>
                <li><button hx-get="/books/add/finished">Add Finished Book</button></li>
            </ul>
        </header>
    </body>
    </html>
    `
}

export { createAdminPage }