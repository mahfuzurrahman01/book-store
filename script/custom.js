


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
        let card = '';
        const response = await fetch(url);
        const data = await response.json();
        const result = data?.results; // Process the data here

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
        document.querySelector(".loader-main-container").innerHTML = '';
        // Set the generated HTML to the book list container
        document.getElementsByClassName("book-list-container")[0].innerHTML = card;
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


const paginationHandleNext = () => {
    pageCount++
    console.log(pageCount)
    localStorage.setItem("pageCount", JSON.stringify(pageCount));
    document.getElementsByClassName("book-list-container")[0].innerHTML = '';
    document.getElementsByClassName("pagination-main-container")[0].innerHTML = '';
    url = `https://gutendex.com/books/?page=${pageCount}`
    console.log(url)
    getData(url)
}

const paginationHandlePrev = () => {
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

const getPageCount =async () => {
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

let pageCount;
getPageCount()

