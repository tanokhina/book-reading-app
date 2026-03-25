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

export default function AddBookModal({ books, onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [review, setReview] = useState('')
  const [status, setStatus] = useState('not started')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      setError('Title and author are required.')
      return
    }

    const duplicate = books.some(
      (b) => b.title.toLowerCase() === trimmedTitle.toLowerCase() &&
             b.author.toLowerCase() === trimmedAuthor.toLowerCase()
    )
    if (duplicate) {
      setError('This book is already in your list.')
      return
    }

    onAdd({ title: trimmedTitle, author: trimmedAuthor, review: review.trim(), status })
    onClose()
  }

  return (
    <Modal title="Add book" onClose={onClose}>
      <form className="book-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Title"
          id="add-title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError('') }}
          placeholder="Book title"
          required
        />
        <Input
          label="Author"
          id="add-author"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setError('') }}
          placeholder="Author name"
          required
        />
        <Textarea
          label="Quick thoughts (optional)"
          id="add-review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="What stood out? Favorite moment, vibe, or quick takeaway..."
        />
        <Select
          label="Status"
          id="add-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={STATUS_OPTIONS}
        />
        {error && <p className="book-form__error" role="alert">{error}</p>}
        <div className="book-form__actions">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
          <Button type="submit" variant="primary" fullWidth>Add book</Button>
        </div>
      </form>
    </Modal>
  )
}
