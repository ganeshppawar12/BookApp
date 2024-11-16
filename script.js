const url = 'https://books-backend.p.goit.global/books/top-books ';
const url2 = ' https://books-backend.p.goit.global/books/category-list';

const category = document.getElementById('category');
const bookCategoryArr= [] ;

const bookSection = document.getElementById('bookSection');
const booksArr= [] ;

const loader = document.getElementById('loader');

async function fetchTopBook(da){



    try{
        const res = await fetch(da);
         const data1 =await res.json();
         bookCategoryArr.push(data1);
        

         let sidebar = '<ul class="sideBar-option">';

         bookCategoryArr[0].forEach((value, index, array) => {
         
             sidebar += `
             <li class="sidebar-option-list">${value.list_name}</li> 
             `
         })
         
         sidebar += '</ul>';
         category.innerHTML = sidebar;


    }
    catch(err){
        console.error("Error fetching data:", err);
    }


}
fetchTopBook(url2);

async function fetchBooks(da){

    try{
        const res = await fetch(da);
         const data1 =await res.json();
         booksArr.push(data1);
        console.log(booksArr)

       

           
         booksArr[0].forEach((value, index, array) => {
            let container =document.createElement('div');
            container.classList.add("container")
            container.innerHTML = `<p class="books-section-title">${value.list_name}</p>
            
            
            `
         let main =document.createElement('div');
         main.classList.add('book-list')
          
            value.books.forEach((item, index2, array2) => {
                let chaildDiv = document.createElement('div');
                chaildDiv.classList.add('book')
             chaildDiv.innerHTML = `
             <img src='${item.book_image}' alt='${item.title}' loading='lazy'>
             <div class="book_desc">
             <h3 class="title">${item.title}</h3>
             <p class="author">${item.author}</p> 
             </div>
             
             `
             main.appendChild(chaildDiv);
 
            })
           
            container.appendChild(main);
            // let seeMorebtn =document.createElement('button');
            // container.appendChild(<button class="see-more" data-category="${value.list_name}">See more</button>);
            container.innerHTML += `<button class="see-more" data-category="${value.list_name}">See more</button>`

            bookSection.appendChild(container)
         })
         
        


    }
    catch(err){
        console.error("Error fetching data:", err);
    }


}

fetchBooks(url)
