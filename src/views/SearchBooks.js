import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book'
import './css/searchbooks.css'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeGroup: PropTypes.func.isRequired
  }

  state = {
    query: '',
    newBooks: [],
    error: false
  };
  
  getBooks = event => {
    const query = event.target.value
    // Below call is async
    this.setState({ query: query })
    let self = this
    // debounce time to optimize
    setTimeout(function(){ 
      // if user input => run the search
      if (query && query === self.state.query) {
        BooksAPI.search(query.trim(), 20).then(books => {
            debugger
            books.length > 0
            ? self.setState({ newBooks: books,  error: false })
            : self.setState({ newBooks: [],  error: true });
        });
  
        // if query is empty => reset state to default
      } else self.setState({ newBooks: [],  error: false });
     }, 2000)
    
   
  };

  render() {
    const books  = this.state.newBooks;
    return (
      <div>
        <div className="input-group mb-3  input-group-lg">
          <div className="input-group-prepend">
            <Link className="input-group-text" to="/">
            <i className="fa fa-arrow-left" aria-hidden="true"> </i></Link>
          </div>
          <input type="text" className="form-control" placeholder="Username" 
          aria-label="Username" aria-describedby="basic-addon1" onChange={this.getBooks} />
        </div>
        <section className="d-flex d-flex-row flex-wrap">
        {
          books.map((book)=> (
            <Book key={book.id} book={book} changeGroup={this.props.changeGroup} />
          )
          )
        }
        </section>
      </div>
      )
    }
}

export default SearchBooks;