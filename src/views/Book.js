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
  render() {
    const book = this.props.book
    const imgLink = book.imageLinks === undefined ? require('../images/no_thumb.jpg') : book.imageLinks.thumbnail
    const bookTitle = book.title ? book.title : 'No title available';
    return (
      <div className="col-md-2 col-md-offset-1">
        <div className="col-12 book">
          <img className='bookimg' src={imgLink} alt=""/>
          <button type="button" className="bookmenu btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
          </button>
          <div className="dropdown-menu">
            <h5 className="dropdown-header">Move To</h5>
            <span role='button' className="dropdown-item" onClick={this.groupSelected} data-selected='currentlyReading'>Currently Reading</span>
            <span role='button' className="dropdown-item" onClick={this.groupSelected}  data-selected='wantToRead'>Want to Read</span>
            <span role='button' className="dropdown-item" onClick={this.groupSelected} data-selected='read'>Read</span>
            <span role='button' className="dropdown-item" onClick={this.groupSelected} data-selected='none'>None</span>
          </div>
        </div>
        <div>{bookTitle}</div>
      </div>
    )
  }
}

export default Book;