function getQueryParam(param) {
    console.log('param', param);
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// Get the book ID from the URL
const bookId = getQueryParam('id');

// Function to fetch and display the book details
async function getBookDetails(bookId) {
    let loader = '';
    loader = `
           <P class="please-text">Please</P>
           <div class="loader-container">
           <div class="loader">
           </div>
           </div>
           <div class="loader-container">
           <div class="loader">
           </div>
           </div>
           <div class="loader-container">
           <div class="loader">
           </div>
           </div>
           <p class="please-text">Wait!!</p>`;

    document.querySelector(".loader-main-container").innerHTML = loader;

    let includedId = false;
    let cardHTML = ''; // Initialize an empty string to store the card HTML
    console.log('param', bookId);

    try {
        const response = await fetch(`https://gutendex.com/books/${bookId}/`);
        const data = await response.json();
        console.log(data);

        const wishlist = localStorage.getItem("wishlist");
        if (wishlist !== null) {
            const parsedList = JSON.parse(wishlist);
            const findItem = parsedList.find(item => item.id == data?.id);
            if (findItem?.id) {
                includedId = true;
            }
        }
        //============ clear the loader =============
        document.querySelector(".loader-main-container").innerHTML = '';
        // Display the book details
        cardHTML += `
            <div class="books-card">
                <img src="${data?.formats['image/jpeg']}" class="book-image" alt="book-cover-image">
            </div>
            <div class="book-info-container">
                <div class="book-info">
                    <div class="title-id">
                        <h1 class="book-title">${data?.title}</h1>
                    </div>
                    <p class="book-author">${data?.authors[0]?.name}</p>
                    <p class="author-date">(${data?.authors[0]?.birth_year} - ${data?.authors[0]?.death_year})</p>
                    <p class="book-genre">Genre - ${data?.subjects[0]}</p>
                    <p class="book-id">ID: ${data?.id}</p>
                </div>
                <div class="book-info2">
                    <div class="subject-details">
                        <h4>Subjects: </h4>
                        <div class="subject-group">
                            ${data.subjects.map(subject => `<p class="subject-name">${subject}</p>`).join('')}
                        </div>
                    </div>
                    <div class="bookshelf-details">
                        <h4>Bookshelf: </h4>
                        <div class="bookshelf-group">
                                 ${data.bookshelves.map(bookshelf => `<p class="bookshelf-name">${bookshelf}</p>`).join('')}
                        </div>
                        
                    </div>
                    <div class="download-details">
                        <h4>Total Download: </h4>
                        <p class="download-count">${data?.download_count} <i class="fa-solid fa-download"></i></p>
                    </div>
                    
                </div>
            </div>`;


        // Insert the generated HTML into the container
        document.querySelector(".book-list-container").innerHTML = cardHTML;

    } catch (error) {
        console.error("Error fetching book details:", error);
    }
}


// Fetch and display the book details
if (bookId) {
    getBookDetails(bookId);
} else {
    console.error("No book ID found in the URL");
}
