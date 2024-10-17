async function getData() {
    try {
        const response = await fetch('https://gutendex.com/books/');
        const data = await response.json();
        const result = data?.results; // Process the data here
        let card = '';
        
        // Loop through each book and generate HTML
        result.forEach(element => {
            card += `
        <div class="books-card">
            <img src="${element?.formats['image/jpeg']}" class="book-image" alt="book-cover-image">
            <div class="book-info">
                <div class="title-id">
                    <h1 class="book-title">${element?.title}</h1>
                </div>
                <p class="book-author">${element?.authors[0]?.name}</p>
                <p class="author-date">(${element?.authors[0]?.birth_year} - ${element?.authors[0]?.death_year})</p>
                <p class="book-genre">Genre - ${element?.subjects[0]}</p>
                <p class="book-id">ID: ${element?.id}</p>
                <div class="btn-group">
                    <a href="details.html?id=${element?.id}"><button class="view-btn">Book details</button></a>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        </div>`;
        });
        
        // Set the generated HTML to the book list container
        document.getElementsByClassName("book-list-container")[0].innerHTML = card;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getData();
