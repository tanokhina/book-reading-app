import './BookCard.css'

const STATUS_CONFIG = {
  'not started': { label: 'Not started', className: 'status--neutral' },
  'in progress': { label: 'In progress', className: 'status--warning' },
  'finished':    { label: 'Finished',    className: 'status--success' },
}

export default function BookCard({ book, onEdit }) {
  const status = STATUS_CONFIG[book.status] || STATUS_CONFIG['not started']

  return (
    <button className="book-card" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>
      <div className="book-card__info">
        <span className="book-card__title">{book.title}</span>
        <span className="book-card__author">{book.author}</span>
      </div>
      <div className="book-card__right">
        <span className={`book-card__status ${status.className}`}>{status.label}</span>
      </div>
    </button>
  )
}
