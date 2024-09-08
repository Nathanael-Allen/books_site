async function getGoogleBook(bookTitle){
    try{
        const baseURL = new URL('https://www.googleapis.com');
        const search = bookTitle.replace(' ', '+');
        baseURL.pathname = '/books/v1/volumes';
        baseURL.searchParams.set('q', search);
        baseURL.searchParams.set('fields', 'items(volumeInfo(title,authors,imageLinks))');
        baseURL.searchParams.set('key', process.env.API_KEY);

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(baseURL.href, {
            method: 'GET',
            headers: headers,
        });

        const cover = await response.json();
        return cover.items;
    }
    catch(err){
        console.log(err)
    }
};
