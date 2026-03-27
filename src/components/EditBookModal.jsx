import { useState } from 'react'
import Modal from './ui/Modal.jsx'
import Input from './ui/Input.jsx'
import Textarea from './ui/Textarea.jsx'
import Select from './ui/Select.jsx'
import Button from './ui/Button.jsx'
import './BookForm.css'

const STATUS_OPTIONS = [
  { value: 'not started', label: 'Not started' },
  { value: 'in progress', label: 'In progress' },
  { value: 'finished',    label: 'Finished' },
]

export default function EditBookModal({ book, books, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [review, setReview] = useState(book.review || '')
  const [status, setStatus] = useState(book.status)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    onDelete(book.id)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      setError('Title and author are required.')
      return
    }

    const duplicate = books.some(
      (b) => b.id !== book.id &&
             b.title.toLowerCase() === trimmedTitle.toLowerCase() &&
             b.author.toLowerCase() === trimmedAuthor.toLowerCase()
    )
    if (duplicate) {
      setError('Another book with this title and author already exists.')
      return
    }

    onSave({ ...book, title: trimmedTitle, author: trimmedAuthor, review: review.trim(), status })
    onClose()
  }

  return (
    <Modal title="Edit book" onClose={onClose}>
      <form className="book-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Title"
          id="edit-title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError('') }}
          placeholder="Book title"
          required
        />
        <Input
          label="Author"
          id="edit-author"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setError('') }}
          placeholder="Author name"
          required
        />
        <Textarea
          label="Quick thoughts (optional)"
          id="edit-review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="What stood out? Favorite moment, vibe, or quick takeaway..."
        />
        <Select
          label="Status"
          id="edit-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={STATUS_OPTIONS}
        />
        {error && <p className="book-form__error" role="alert">{error}</p>}
        <div className="book-form__actions">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
          <Button type="submit" variant="primary" fullWidth>Save changes</Button>
        </div>
        {confirmDelete ? (
          <div className="book-form__delete-confirm">
            <p className="book-form__delete-text">Delete this book?</p>
            <div className="book-form__actions">
              <Button type="button" variant="secondary" onClick={() => setConfirmDelete(false)} fullWidth>Cancel</Button>
              <Button type="button" variant="danger" onClick={handleDelete} fullWidth>Yes, delete</Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="text" onClick={() => setConfirmDelete(true)} fullWidth>
            Delete book
          </Button>
        )}
      </form>
    </Modal>
  )
}
