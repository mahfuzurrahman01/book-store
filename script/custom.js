
//======================== adding book list to ui ====================
const addingBookListToUi = (arr) => {
    console.log(arr)
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
                    <h1 class="book-title">${!element?.title ? '--' : element?.title?.slice(0, 30)}...</h1>
                </div>
                <p class="book-author">${!element?.authors[0]?.name ? "--" : element?.authors[0]?.name}</p>
                <p class="author-date">(${!element?.authors[0]?.birth_year ? "--" : element?.authors[0]?.birth_year} - ${!element?.authors[0]?.death_year ? '--' : element?.authors[0]?.death_year})</p>
                <p class="book-genre">Genre - ${!element?.subjects[0] ? "--" : element?.subjects[0]}</p>
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
        console.log(result);
        if (result.length == 0 && url?.split("search")?.length == 2) {
            document.querySelector(".warning-main-container").innerHTML = noBookMessageInStore;
            document.querySelector(".loader-main-container").innerHTML = "";
            return;
        }
        let selectedGenre = localStorage.getItem('selected-genre')
        if (selectedGenre) {
            document.querySelector(".filter-message-container").innerHTML = backTo;
        } else {
            document.querySelector(".filter-message-container").innerHTML = "";
        }

        localStorage.setItem('allBooks', JSON.stringify(result))
        // ============== now getting the stored filter text from localStorage ===========
        const inputText = localStorage.getItem("searchInput");
        console.log(inputText)
        if (inputText?.length > 0) {
            document.querySelector(".warning-main-container").innerHTML = "";
            getSortBooks(inputText)
            inputField.value = inputText;
        } else {
            const localStoreData = localStorage.getItem("allBooks");
            const booksArr = JSON.parse(localStoreData)
            addingBookListToUi(booksArr)
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
        if (!selectedGenre) {
            document.getElementsByClassName("pagination-main-container")[0].innerHTML = pagination;
        }else {
            document.getElementsByClassName("pagination-main-container")[0].innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector(".warning-main-container").innerHTML = connectionError;
        document.querySelector(".loader-main-container").innerHTML = '';
    }
}


// ================== next handle press in pagination =======================//

const paginationHandleNext = () => {
    localStorage.setItem("selected-genre", "");
    document.querySelector(".filter-message-container").innerHTML = "";
    document.querySelector(".dropdown-text").textContent = "Filter by Genre";
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
    document.querySelector(".filter-message-container").innerHTML = "";
    localStorage.setItem("selected-genre", "");
    document.querySelector(".dropdown-text").textContent = "Filter by Genre";
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
    const filterInput = localStorage.getItem("selected-genre");
    console.log(filterInput)
    if (filterInput) {
        pageCount = 1;
        localStorage.setItem("pageCount", JSON.stringify(1))
        let url = `https://gutendex.com/books?topic=${filterInput}`
        document.querySelector(".dropdown-text").textContent = filterInput;
        localStorage.setItem("pageCount", JSON.stringify(1));
        pageCount = 1;
        getData(url)
        return
    }
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

let noBookMessage = `<div class="warning-no-book"><h3>No book found for this Title/Name. In this page!!</h3>
<small>You can search in whole store with this keyword you input!</small>
<button onclick="searchWithKeyword()" class="search-input-button">Search</button>
</div>`

let backTo = `<div class="warning-no-book">
<button onclick="backToFirstScreen()" class="search-input-button">Back to All Books</button>
</div>`
let noBookMessageInStore = `<div class="warning-no-book"><h3>Sorry No book found for this Title/Name!!</h3>
</div>`
let connectionError = `<div class="warning-no-book"><h3>Something went wrong!!</h3>
<small>Please check your internet connection!</small>
</div>`



// ================= sort out books ==============================

const getSortBooks = async (name) => {

    const localStoreData = localStorage.getItem("allBooks");
    const books = JSON.parse(localStoreData);
    if (books?.length > 0) {
        document.querySelector(".loader-main-container").innerHTML = '';
        const filteredBooks = books.filter((book) => {
            // Ensure book.title exists before calling toLowerCase
            return book.title && book.title.toLowerCase().includes(name.toLowerCase());
        });
        console.log(filteredBooks)
        if (filteredBooks.length == 0) {
            document.querySelector(".warning-main-container").innerHTML = noBookMessage;
        }
        addingBookListToUi(filteredBooks)
    }
}

// ======================== search with keyword =====================

function searchWithKeyword() {
    document.querySelector(".warning-main-container").innerHTML = "";
    document.querySelector(".dropdown-text").textContent = "Filter by Genre";
    localStorage.setItem("selected-genre", "");
    let inputKeyword = localStorage?.getItem("searchInput");
    // ========== this will help us to change our search keyword (according to the api document) ================
    let remakeInput = inputKeyword.replace(" ", "%20");
    let url = `https://gutendex.com/books?search=${remakeInput}`;
    console.log(inputKeyword)
    // localStorage.setItem("searchInput", "");
    getData(url);
}

//  ======================= add To wishlist function =================== 

function addToWishList(id) {
    console.log(id);
    const localStoreData = localStorage.getItem("allBooks");
    const books = JSON.parse(localStoreData);
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        console.error("Book not found");
        return;
    }
    console.log("Adding to wishlist:", book);

    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const parsedList = JSON.parse(wishListInStore);


    if (!parsedList.some(item => item.id === book.id)) {
        parsedList.push(book);
        localStorage.setItem("wishlist", JSON.stringify(parsedList));
        const name = localStorage.getItem("searchInput") || "";
        document.querySelector(".warning-main-container").innerHTML = "";
        getSortBooks(name)
    }
}

// ===============================Remove from wishlist function=================
function removeFromWishList(id) {
    const localStoreData = localStorage.getItem("allBooks");
    const books = JSON.parse(localStoreData);
    console.log(id);
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        console.error("Book not found");
        return;
    }
    console.log("Removing from wishlist:", book);

    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const parsedList = JSON.parse(wishListInStore);

    const updatedList = parsedList.filter(item => item.id !== book.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    const name = localStorage.getItem("searchInput") || "";
    document.querySelector(".warning-main-container").innerHTML = "";
    getSortBooks(name)
}


// ================= this function will open or close the dropdown ====================
const dropdownItems = document.querySelectorAll('.dropdown-item');
let dropdownMenu = document.querySelector(".dropdown-menu");

function openDropdownMenu() {
    dropdownMenu.classList.toggle('show');
}

// Close the dropdown when clicking outside of it
window.addEventListener('click', function (event) {
    const dropdownContainer = document.querySelector('.dropdown-container');
    if (!dropdownContainer.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// ==================== this function will search with genre =========================

dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents the default link behavior
        console.log(item?.textContent)
        localStorage.setItem("selected-genre", item?.textContent);
        if (item?.textContent) {
            document.getElementsByClassName("book-list-container")[0].innerHTML = '';
            localStorage.setItem("searchInput", "");
            pageCount = 1;
            localStorage.setItem("pageCount", JSON.stringify(1))
            inputField.value = "";
            document.querySelector(".dropdown-text").textContent = item?.textContent;
            let url = `https://gutendex.com/books?topic=${item.textContent}`
            getData(url)
        }
        dropdownMenu.classList.remove('show'); // Close the dropdown after selection
    });
});

// ======================== this function will remove All the filter ======================= 
function backToFirstScreen() {
    localStorage.setItem("searchInput", "");
    localStorage.setItem("selected-genre", "");
    document.querySelector(".dropdown-text").textContent = "Filter by Genre";
    getPageCount();
}

// ================= this function will get triggered when search input change ====================

let inputField = document.getElementById("search");
// Add event listener for 'change' event
inputField.addEventListener('input', (event) => {
    document.querySelector(".warning-main-container").innerHTML = "";
    let name = event.target.value;  // This will log the value when it changes
    localStorage.setItem("searchInput", name);
    getSortBooks(name)
});

let pageCount;
let dropDownState = false;
getPageCount();


// children,fiction,horror,Scientists,Conflict ,Domestic ,Tragedies, love, family, drama