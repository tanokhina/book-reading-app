import BookCard from './BookCard.jsx'
import './BookList.css'

export default function BookList({ books, onEdit, onDelete, onStatusChange }) {
  if (books.length === 0) {
    return (
      <div className="book-list__empty">
        <p className="book-list__empty-icon">📚</p>
        <p className="book-list__empty-text">No books yet</p>
        <p className="book-list__empty-sub">Add your first book from the Home tab</p>
      </div>
    )
  }

  return (
    <ul className="book-list" role="list">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </li>
      ))}
    </ul>
  )
}
