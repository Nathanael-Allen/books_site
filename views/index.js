
function CreateIndexPage(){
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
    <body>
        <div>
            <header><h1>My Book List</h1></header>        
            <div hx-get="/finishedbooks" hx-trigger="load">

            </div>
            <div hx-get="/addbook" hx-trigger="load">

            </div>
        </div>
    </body>
    </html>
    `
}

export {CreateIndexPage}