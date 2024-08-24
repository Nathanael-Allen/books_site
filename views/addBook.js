function addBook(){
    return /*html*/`
        <h4>Add Book</h4>
        <form action="/addbook" method="post">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <label for="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="0" max="10">
            <input type="submit" value="Submit">
        </form>
    `
}

export {addBook}