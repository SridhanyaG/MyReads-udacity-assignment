import PropTypes from 'prop-types';
import React, { Component } from 'react'
import './css/book.css'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeGroup: PropTypes.func.isRequired
  }
  groupSelected = (e) => {
    let value = e.target.getAttribute('data-selected')
    this.props.changeGroup(this.props.book, value)
  }
  deriveShelfStateForBook = (shelf, optionText) => {
    let computedClassName = 'dropdown-item'
    if (shelf === optionText) {
      computedClassName += ' active'
    }
    return computedClassName
  }
  render() {
    let book = this.props.book
    let authorName = (book.authors!== undefined && book.authors!== null) ? book.authors.join(",") : 'No Author'
    let imgLink = book.imageLinks === undefined ? require('../images/no_thumb.jpg') : book.imageLinks.thumbnail
    let bookTitle = book.title ? book.title : 'No title available';
    let currentlyReadingClassName = this.deriveShelfStateForBook(book.shelf, 'currentlyReading')
    let wantToReadClassName = this.deriveShelfStateForBook(book.shelf, 'wantToRead')
    let readClassName = this.deriveShelfStateForBook(book.shelf, 'read')
    let noneClassName = this.deriveShelfStateForBook(book.shelf, 'none')
    return (
      <div className="col-md-2 col-md-offset-1">
        <div className="col-12 book">
          <img className='bookimg' src={imgLink} alt=""/>
          <button type="button" className="bookmenu btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
          </button>
          <div className="dropdown-menu">
            <h5 className="dropdown-header">Move To</h5>
            <span role='button' className={currentlyReadingClassName} onClick={this.groupSelected} data-selected='currentlyReading'>Currently Reading</span>
            <span role='button' className={wantToReadClassName} onClick={this.groupSelected} data-selected='wantToRead'>Want to Read</span>
            <span role='button' className={readClassName}  onClick={this.groupSelected} data-selected='read'>Read</span>
            <span role='button' className={noneClassName}  onClick={this.groupSelected} data-selected='none'>None</span>
          </div>
        </div>
        <h5>{bookTitle}</h5>
        <div className="text-muted">{authorName}</div>
      </div>
    )
  }
}

export default Book;