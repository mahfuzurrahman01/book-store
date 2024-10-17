
//======================== adding book list to ui ====================
let includedId = false;
const addingBookListToUi = (arr) => {

    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const wishList = JSON.parse(wishListInStore);

    let card = '';
    arr.forEach(element => {

        const isInWishlist = wishList.some(book => book.id === element.id);

        card += `
        <div class="books-card">
            <img src="${element?.formats['image/jpeg']}" class="book-image" alt="book-cover-image">
            <div class="book-info">
                <div class="title-id">
                    <h1 class="book-title">${element?.title?.slice(0, 30)}...</h1>
                </div>
                <p class="book-author">${element?.authors[0]?.name}</p>
                <p class="author-date">(${element?.authors[0]?.birth_year} - ${element?.authors[0]?.death_year})</p>
                <p class="book-genre">Genre - ${element?.subjects[0]}</p>
                <p class="book-id">ID: ${element?.id}</p>
                <div class="btn-group">
                    <a href="details.html?id=${element?.id}"><button class="view-btn">Book details</button></a>
                   <i class="fa-solid fa-heart" 
                        style="color: ${isInWishlist ? 'red' : 'gray'}" 
                        onclick="${isInWishlist ? `removeFromWishList(${JSON.stringify(element?.id)})` : `addToWishList(${JSON.stringify(element?.id)})`}"></i>
                </div>
            </div>
        </div>`;
    });

    document.getElementsByClassName("book-list-container")[0].innerHTML = card;
}


async function getData(url) {
    console.log(url)
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
          <p class="please-text">Wait!!</p>`


    document.querySelector(".loader-main-container").innerHTML = loader;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data?.results; // Process the data here
        books = [...books, ...result];
        // ============== now getting the stored filter text from localStorage ===========
        const inputText = localStorage.getItem("searchInput");
        console.log(inputText)
        if (inputText?.length > 0) {
            getSortBooks(inputText)
            inputField.value = inputText;
        } else {
            addingBookListToUi(result)
            inputField.value = "";
        }

        document.querySelector(".loader-main-container").innerHTML = '';

        // now we are adding our pagination 
        let pagination = ` <div class="pagination-container">
        <div onclick="paginationHandlePrev()" class="prev-btn">
            <i class="fa-solid fa-circle-chevron-left"></i>
        </div>
        <div  class="page-number">
        <p class="number">${pageCount}<p>
        </div>
        <div onclick="paginationHandleNext()"  class="next-btn">
            <i class="fa-solid fa-circle-chevron-right"></i>
        </div>
        </div>`
        document.getElementsByClassName("pagination-main-container")[0].innerHTML = pagination;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// ================== next handle press in pagination =======================//

const paginationHandleNext = () => {
    localStorage.setItem("searchInput", "");
    pageCount++
    console.log(pageCount)
    localStorage.setItem("pageCount", JSON.stringify(pageCount));
    document.getElementsByClassName("book-list-container")[0].innerHTML = '';
    document.getElementsByClassName("pagination-main-container")[0].innerHTML = '';
    url = `https://gutendex.com/books/?page=${pageCount}`
    console.log(url)
    getData(url)

}

// ================== previous handle press in pagination =======================//

const paginationHandlePrev = () => {
    localStorage.setItem("searchInput", "");
    if (pageCount !== 1) {
        pageCount--
        console.log(pageCount)
        localStorage.setItem("pageCount", JSON.stringify(pageCount));
        document.getElementsByClassName("book-list-container")[0].innerHTML = '';
        document.getElementsByClassName("pagination-main-container")[0].innerHTML = '';
        url = `https://gutendex.com/books/?page=${pageCount}`
        console.log(url)
        getData(url)
    } else {
        console.log('already in last page');
    }
}

// ====================== this will add our page number from localStorage =================

const getPageCount = async () => {
    const pageNum = localStorage.getItem("pageCount");
    console.log(pageNum)
    const number = JSON.parse(pageNum)
    if (!number || pageNum == null) {
        pageCount = 1;
        let url = `https://gutendex.com/books/?page=${pageCount}`
        getData(url)
    } else {
        pageCount = number;
        let url = `https://gutendex.com/books/?page=${pageCount}`
        getData(url)
    }

}


// ================= sort out books ==============================

const getSortBooks = async (name) => {
    console.log("we are getting from ", name)
    if (books?.length > 0) {

        const filteredBooks = books.filter((book) => {
            // Ensure book.title exists before calling toLowerCase
            return book.title && book.title.toLowerCase().includes(name.toLowerCase());
        });
        console.log(filteredBooks)
        addingBookListToUi(filteredBooks)
    }
}



//  ======================= add To wishlist function =================== 
// Add to wishlist function
function addToWishList(id) {
    console.log(id);
    // Find the book data by id
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        console.error("Book not found");
        return;
    }
    console.log("Adding to wishlist:", book);

    // Add book to wishlist logic here
    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const parsedList = JSON.parse(wishListInStore);

    // Check if the book is already in the wishlist
    if (!parsedList.some(item => item.id === book.id)) {
        parsedList.push(book);
        localStorage.setItem("wishlist", JSON.stringify(parsedList));
        const name = localStorage.getItem("searchInput") || "";
        getSortBooks(name)
    }
}

// Remove from wishlist function
function removeFromWishList(id) {
    // Find the book data by id
    console.log(id);
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        console.error("Book not found");
        return;
    }
    console.log("Removing from wishlist:", book);

    // Remove book from wishlist logic
    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const parsedList = JSON.parse(wishListInStore);

    const updatedList = parsedList.filter(item => item.id !== book.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    const name = localStorage.getItem("searchInput") || "";
        getSortBooks(name)
}


// ================= this function will get triggered when search input change ====================

let inputField = document.getElementById("search");
// Add event listener for 'change' event
inputField.addEventListener('input', (event) => {
    let name = event.target.value;  // This will log the value when it changes
    localStorage.setItem("searchInput", name);
    getSortBooks(name)
});

let pageCount;
let books = [];
getPageCount();


