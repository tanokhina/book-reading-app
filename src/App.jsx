import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import HomePage from './components/HomePage.jsx'
import AddBookModal from './components/AddBookModal.jsx'
import EditBookModal from './components/EditBookModal.jsx'
import Modal from './components/ui/Modal.jsx'
import Button from './components/ui/Button.jsx'
import './App.css'

const MAX_BOOKS = 100
const DEFAULT_GOAL = 12

export default function App() {
  const [books, setBooks] = useLocalStorage('books', [])
  const [yearlyGoal, setYearlyGoal] = useLocalStorage('yearlyGoal', DEFAULT_GOAL)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showLimitPrompt, setShowLimitPrompt] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const handleAddBook = () => {
    if (books.length >= MAX_BOOKS) {
      setShowLimitPrompt(true)
    } else {
      setShowAddModal(true)
    }
  }

  const handleBookAdded = (bookData) => {
    const newBook = { id: Date.now(), ...bookData }
    setBooks((prev) => [...prev, newBook])
  }

  const handleBookSaved = (updatedBook) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)))
  }

  const handleBookDeleted = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const handleStatusChange = (id, status) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const handleGoalSave = (newGoal) => {
    setYearlyGoal(newGoal)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">Book Tracker</h1>
      </header>

      <main className="app-content">
        <HomePage
          books={books}
          yearlyGoal={yearlyGoal}
          maxBooks={MAX_BOOKS}
          onGoalSave={handleGoalSave}
          onEditBook={setEditingBook}
        />
      </main>

      <footer className="app-footer">
        <Button variant="primary" size="lg" fullWidth onClick={handleAddBook}>
          + Add book
        </Button>
      </footer>

      {showAddModal && (
        <AddBookModal
          books={books}
          onAdd={handleBookAdded}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          books={books}
          onSave={handleBookSaved}
          onDelete={handleBookDeleted}
          onClose={() => setEditingBook(null)}
        />
      )}

      {showLimitPrompt && (
        <Modal title="Book limit reached" onClose={() => setShowLimitPrompt(false)}>
          <div className="limit-prompt">
            <p className="limit-prompt__text">
              You've reached the maximum of {MAX_BOOKS} books for your list.
            </p>
            <Button variant="primary" fullWidth onClick={() => setShowLimitPrompt(false)}>
              Got it
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
