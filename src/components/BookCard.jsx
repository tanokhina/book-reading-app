import { useState } from 'react'
import Button from './ui/Button.jsx'
import './BookCard.css'

const STATUS_CONFIG = {
  'not started': { label: 'Not started', className: 'status--neutral' },
  'in progress': { label: 'In progress', className: 'status--warning' },
  'finished':    { label: 'Finished',    className: 'status--success' },
}

export default function BookCard({ book, onEdit, onDelete, onStatusChange }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const status = STATUS_CONFIG[book.status] || STATUS_CONFIG['not started']

  return (
    <div className="book-card">
      <div className="book-card__main">
        <div className="book-card__info">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
          {book.review && <p className="book-card__review">{book.review}</p>}
        </div>
        <span className={`book-card__status ${status.className}`}>{status.label}</span>
      </div>

      <div className="book-card__actions">
        <select
          className="book-card__status-select"
          value={book.status}
          onChange={(e) => onStatusChange(book.id, e.target.value)}
          aria-label="Change reading status"
        >
          <option value="not started">Not started</option>
          <option value="in progress">In progress</option>
          <option value="finished">Finished</option>
        </select>

        <div className="book-card__buttons">
          {confirmDelete ? (
            <>
              <span className="book-card__confirm-text">Delete?</span>
              <Button size="sm" variant="danger" onClick={() => onDelete(book.id)}>Yes</Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>No</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => onEdit(book)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(true)}>Delete</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
