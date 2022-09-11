import './App.css';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import './style.css'

function App() {
  const [items, setItems] = useState([])

  const [pageCount, setpageCount] = useState(0);
  
  let limit = 12;

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`);
      const data = await response.json()
      const total = response.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit))
      setItems(data);
    }
    getComments();
  },[])

  const fetchComments = async (currentPage) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=12`)

      // `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`

    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data)=> {
    console.log(data.selected);
    
    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);
    
    setItems(commentsFormServer);
  }

  return (
    <div className='container'>
      <h1 className='header'>React Pagination</h1>
      <div className='row m-2'>
        {items.map((item) => {
         return (<div  key={item.id} className='col-sm-6 col-md-4 v my-2'>
          <div className='card shadow-sm w-100' style={{minHeight: 225}}>
            <div className='card-body'>
              <h5 className='card-title text-center h2'>Id: {item.id} </h5>
              <h6 className='card-subtitle mb-2 text-muted text-center'>{item.email}</h6>
              <p className='card-text'>{item.body}</p>
            </div>
          </div>
        </div>
        );
      })}
      </div>
      
      <ReactPaginate 
        previousLabel = {'Previous'}
        nextLabel = {'Next'}
        breakLabel = {'...'}
        pageCount = {pageCount}
        marginPagesDisplayed = {3}
        pageRangeDisplayed = {3}
        onPageChange = {handlePageClick}
        containerClassName = {'pagination justify-content-center'}
        pageClassName = {'page-item'}
        pageLinkClassName= {'page-link'}
        previousClassName = {'page-item'}
        previousLinkClassName = {'page-link'}
        nextClassName = {'page-item'}
        nextLinkClassName = {'page-link'}
        breakClassName = {'page-item'}
        breakLinkClassName = {'page-link'}
        activeClassName = {'active'}
      />
    </div>
  );
}

export default App;


// data - returns the object that contianes the index number of the page clicked page - eg. {selected: 12}
// data.select - returns the index of the page clicked/selected as a number - eg. 12
