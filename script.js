const url = 'https://books-backend.p.goit.global/books/top-books';
const url2 = 'https://books-backend.p.goit.global/books/category-list';

const category = document.getElementById('category');
const bookCategoryArr = [];

const bookSection = document.getElementById('bookSection');
const booksArr = [];

const loader = document.getElementById('loader');
const profileIcon = document.getElementById('profileIcon');
document.addEventListener("DOMContentLoaded", () => {
     const logoutBtn = document.getElementById("logOut");
 logoutBtn.addEventListener("click", () => {
        // console.log("hi")
        localStorage.removeItem("loggedInUser");  
        window.location.href = "index.html";  
    });
});
let profileStatus = true;

profileIcon.addEventListener("click", () => {
    if(profileStatus){
        document.getElementById('profileOption').style.display='block'
        profileStatus = false;
    }else{
     document.getElementById('profileOption').style.display='none'
     profileStatus = true;
    }
});

async function fetchTopBook(da) {
    try {
        const res = await fetch(da);
        const data1 = await res.json();
        bookCategoryArr.push(data1);

        let sidebar = '<ul class="sideBar-option">';
        bookCategoryArr[0].forEach((value) => {
            sidebar += `
                <li class="sidebar-option-list">${value.list_name}</li>
            `;
        });
        sidebar += '</ul>';
        category.innerHTML = sidebar;
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

async function fetchBooks(da) {
    try {
        const res = await fetch(da);
        const data1 = await res.json();
        booksArr.push(data1);

        booksArr[0].forEach((value) => {
            let container = document.createElement('div');
            container.classList.add("container");
            container.innerHTML = `
                <p class="books-section-title">${value.list_name}</p>
            `;

            let main = document.createElement('div');
            main.classList.add('book-list');

            value.books.forEach((item) => {
                let childDiv = document.createElement('div');
                childDiv.classList.add('book');
                childDiv.innerHTML = `
                    <div class="image-box">
                        <img src='${item.book_image}' alt='${item.title}' loading='lazy'>
                        <div class="quick-view view">
                            <p style="display: flex; align-items: center; justify-content: center; height: 100%; cursor: pointer;">Quick view</p>
                        </div>
                    </div>
                    <div class="book_desc">
                        <h3 class="title">${item.title}</h3>
                        <p class="author">${item.author}</p> 
                    </div>
                `;
                main.appendChild(childDiv);

                // Add click event for the quick-view dynamically
                
            });

            container.appendChild(main);
            container.innerHTML += `
                <div class="see-more-box">
                    <button class="see-more" data-category="${value.list_name}">See more</button>
                </div>
            `;

            bookSection.appendChild(container);
        });
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}




// // Event delegation for .quick-view click
// bookSection.addEventListener("click", function (event) {
//     const quickViewElement = event.target.closest(".quick-view");
//     if (quickViewElement) {
//         const bookDiv = quickViewElement.closest(".book");
//         const title = bookDiv.querySelector(".title").textContent;
//         const author = bookDiv.querySelector(".author").textContent;
//         console.log({ title, author });
//     }
// });



// Fetch data
fetchTopBook(url2);
fetchBooks(url);




function ViewMore(data) {
    console.log("Book Details:", data);
    alert(`Book Title: ${data.title}\nAuthor: ${data.author}`);
}
