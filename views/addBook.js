function addUnreadBook(){
    return /*html*/`
        <h4>Add Book</h4>
        <form>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <button hx-post="/books/add/unread" hx-target="#main-div">Submit</button>
        </form>
    `
}

function addFinishedBook(){
    return /*html*/`
        <h4>Add Book</h4>
        <form>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <label for="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="0" max="10">
            <label for="review">Review:</label>
            <textarea name="review" id="review" cols="50" rows="4"></textarea>
            <button hx-post="/books/add/finished" hx-target="#main-div">Submit</button>
        </form>
    `
}

export {addUnreadBook, addFinishedBook}