import { useState } from 'react'
import Card from './ui/Card.jsx'
import ProgressBar from './ui/ProgressBar.jsx'
import Button from './ui/Button.jsx'
import GoalSetter from './GoalSetter.jsx'
import './HomePage.css'

const CURRENT_YEAR = new Date().getFullYear()

export default function HomePage({ books, yearlyGoal, onGoalSave, onAddBook }) {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR)
  const finishedCount = books.filter((b) => b.status === 'finished').length

  return (
    <div className="home-page">
      <div className="year-nav">
        <button
          className="year-nav__chevron"
          onClick={() => setSelectedYear((y) => y - 1)}
          aria-label="Previous year"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <span className="year-nav__year">{selectedYear}</span>

        <button
          className="year-nav__chevron"
          onClick={() => setSelectedYear((y) => y + 1)}
          disabled={selectedYear >= CURRENT_YEAR}
          aria-label="Next year"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <Card className="goal-card">
        <GoalSetter
          goal={yearlyGoal}
          booksCount={books.length}
          onSave={onGoalSave}
        />
        <ProgressBar value={finishedCount} max={yearlyGoal} />
        <span className="goal-card__count">{finishedCount} / {yearlyGoal} books read</span>
        {finishedCount >= yearlyGoal && yearlyGoal > 0 && (
          <p className="goal-card__congrats">Goal reached! Keep it up!</p>
        )}
      </Card>

      <Button variant="primary" size="lg" fullWidth onClick={onAddBook}>
        + Add book
      </Button>
    </div>
  )
}
