import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import * as BooksAPI from '../BooksAPI'

class App extends Component {
  state = {
    books: []
  }

  changeGroup = (changedBook, group) => {
    BooksAPI.update(changedBook, group).then(response => {
       // set shelf for new or updated book
       changedBook.shelf = group;
      this.setState(prevState => ({
        books: prevState.books
          // remove updated book from array
          .filter(book => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook)
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books }));
  }
  
  render() {
    const bookLst = this.state.books
    return (
      <div className="container">
      <Switch>
        <Route
            exact path="/search"
            render={({ history }) => (
              <SearchBooks books={bookLst} changeGroup={this.changeGroup} />
            )}
          />
        <Route exact path='/' render={() => (
          <ListBooks
            books={bookLst}
            changeGroup = {this.changeGroup}
          />
        )}/>
      </Switch>
      </div>
    )
  }
}

export default App;