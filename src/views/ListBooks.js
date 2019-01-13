import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book'
import './css/listbooks.css'
import { Link } from 'react-router-dom';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeGroup: PropTypes.func.isRequired
  }
  moveToSearch = () => {
    this.props.history.push('/search')
  }
  render() {
    const books  = this.props.books;
    const bookGrps = [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' }
    ];
    return (
      <div>
        {bookGrps.map((grp, idx) => {
          const filterBks = books.filter(book => book.shelf === grp.type);
          return (
            <div key={idx}><h3 className="bg-dark text-white">{grp.title}</h3>
            <section className="d-flex flex-wrap">
            {
              filterBks.map((book)=> (
                <Book key={book.id} book={book} changeGroup={this.props.changeGroup} />
              )
              )
            }
            </section></div>
          )
        }) }
        <footer className="container">
            <Link to="/search" className="searchLink"><i className="fa fa-plus-circle text-success searchicon"></i></Link>
        </footer>
      </div>
      )
    }
}

export default ListBooks;