
//======================== adding book list to ui ====================
let wishListInStore = localStorage.getItem("wishlist") || "[]";
let wishList = JSON.parse(wishListInStore);
const addingBookListToUi = (arr) => {
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
                    <a onclick="${isInWishlist ? `removeFromWishList(${JSON.stringify(element?.id)})` : `addToWishList(${JSON.stringify(element?.id)})`}"><button class="cart-btn">Remove </button></a>
                  
                   
                   <i class="fa-solid fa-heart" 
                        style="color: ${isInWishlist ? 'red' : 'gray'}" 
                        ></i>
                 
                </div>
            </div>
        </div>`;
    });

    document.getElementsByClassName("book-list-container")[0].innerHTML = card;
}


const sortUiAgain = () => {
    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const wishList = JSON.parse(wishListInStore);
    addingBookListToUi(wishList)
}



//  ======================= add To wishlist function =================== 

function addToWishList(id) {
    console.log(id);

    const book = wishList.find(book => book.id === parseInt(id));
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
        sortUiAgain()

    }
}

// ===============================Remove from wishlist function=================
function removeFromWishList(id) {

    console.log(id);
    const book = wishList.find(book => book.id === parseInt(id));
    if (!book) {
        console.error("Book not found");
        return;
    }
    console.log("Removing from wishlist:", book);

    const wishListInStore = localStorage.getItem("wishlist") || "[]";
    const parsedList = JSON.parse(wishListInStore);

    const updatedList = parsedList.filter(item => item.id !== book.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    sortUiAgain()
}


addingBookListToUi(wishList)