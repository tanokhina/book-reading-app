import BookCard from './BookCard.jsx'
import './BookList.css'

export default function BookList({ books, onEdit }) {
  if (books.length === 0) {
    return (
      <div className="book-list__empty">
        <p className="book-list__empty-icon">📚</p>
        <p className="book-list__empty-text">No books yet</p>
        <p className="book-list__empty-sub">Tap "+ Add book" to get started</p>
      </div>
    )
  }

  return (
    <ul className="book-list" role="list">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}
