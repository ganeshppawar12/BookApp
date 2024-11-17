const url = 'https://books-backend.p.goit.global/books/top-books';
const url2 = 'https://books-backend.p.goit.global/books/category-list';

const category = document.getElementById('category');
const bookCategoryArr = [];

const bookSection = document.getElementById('bookSection');
const booksArr = [];

const loader = document.getElementById('loader');

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
                let quickView = childDiv.querySelector('.book_desc');
               
                quickView.addEventListener('click',function()  {
                    console.log('item');
                });
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

let toggler = document.getElementById('toggler');
let toggleBox = document.getElementById('toggleBox');

let flag = localStorage.getItem('darkMode') === 'true';

if (flag) {
    document.body.classList.add('dark-mode');
    toggleBox.style.border = '1px solid #000';
    toggler.style.transform = 'translateX(30px)';
} else {
    toggleBox.style.border = '1px solid #fff';
    toggler.style.transform = 'translateX(0px)';
}

toggler.addEventListener('click', () => {
    if (flag) {
        toggler.style.transform = 'translateX(0px)';
        document.body.classList.remove('dark-mode');
    } else {
        toggler.style.transform = 'translateX(30px)';
        document.body.classList.add('dark-mode');
    }

    flag = !flag;
    localStorage.setItem('darkMode', flag);
});


function ViewMore(data) {
    console.log("Book Details:", data);
    alert(`Book Title: ${data.title}\nAuthor: ${data.author}`);
}