import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import HomePage from './components/HomePage.jsx'
import BookList from './components/BookList.jsx'
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
  const [activeTab, setActiveTab] = useState('home')
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
        {activeTab === 'home' ? (
          <HomePage
            books={books}
            yearlyGoal={yearlyGoal}
            onGoalSave={handleGoalSave}
            onAddBook={handleAddBook}
          />
        ) : (
          <div className="books-page">
            <h2 className="books-page__title">My Books</h2>
            <p className="books-page__count">{books.length} / {MAX_BOOKS} books</p>
            <BookList
              books={books}
              onEdit={setEditingBook}
              onDelete={handleBookDeleted}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </main>

      <nav className="tab-bar" role="navigation" aria-label="Main navigation">
        <button
          className={`tab-bar__tab${activeTab === 'home' ? ' tab-bar__tab--active' : ''}`}
          onClick={() => setActiveTab('home')}
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <span className="tab-bar__icon" aria-hidden="true">⌂</span>
          <span className="tab-bar__label">Home</span>
        </button>
        <button
          className={`tab-bar__tab${activeTab === 'books' ? ' tab-bar__tab--active' : ''}`}
          onClick={() => setActiveTab('books')}
          aria-current={activeTab === 'books' ? 'page' : undefined}
        >
          <span className="tab-bar__icon" aria-hidden="true">&#9776;</span>
          <span className="tab-bar__label">Books{books.length > 0 ? ` (${books.length})` : ''}</span>
        </button>
      </nav>

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
