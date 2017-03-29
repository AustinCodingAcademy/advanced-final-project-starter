import React, {Component} from 'react';
import Book from './Book';

class BookList extends Component {
  render() {
    let val = <div className="BookList">No movies here!</div>;
    if (this.props.books.length) {
      const books = this.props.books.map((book) =>
      <td id={book.title}>
        <Book title={book.title}
          addable={this.props.addable} add={this.props.add}
          removeable={this.props.removeable} remove={this.props.remove} />
      </td>);
      val = <div className="BookList" width={this.props.book.length * 200}>
        <table>
          <tr>
            {books}
          </tr>
        </table>
      </div>;
    }
    return val;
  }
}

export default BookList;
