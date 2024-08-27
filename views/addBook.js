function addBookToRead(){
    return /*html*/`
        <form action="/addbooktoread" method="post">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <input type="submit" value="Submit">
        </form>
    `
}

function addFinishedBook(){
    return /*html*/`
        <h4>Add Book</h4>
        <form action="/addfinishedbook" method="post">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <label for="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="0" max="10">
            <label for="review">Review:</label>
            <input type="text" id="review" name="review">
            <input type="submit" value="Submit">
        </form>
    `
}

export {addBookToRead, addFinishedBook}