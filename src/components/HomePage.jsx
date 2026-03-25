import Card from './ui/Card.jsx'
import ProgressBar from './ui/ProgressBar.jsx'
import Button from './ui/Button.jsx'
import GoalSetter from './GoalSetter.jsx'
import './HomePage.css'

export default function HomePage({ books, yearlyGoal, onGoalSave, onAddBook }) {
  const finishedCount = books.filter((b) => b.status === 'finished').length

  return (
    <div className="home-page">
      <div className="home-page__year">{new Date().getFullYear()}</div>

      <Card>
        <GoalSetter
          goal={yearlyGoal}
          booksCount={books.length}
          onSave={onGoalSave}
        />
      </Card>

      <Card className="progress-card">
        <div className="progress-card__header">
          <span className="progress-card__title">Reading progress</span>
          <span className="progress-card__count">{finishedCount} / {yearlyGoal} books read</span>
        </div>
        <ProgressBar value={finishedCount} max={yearlyGoal} />
        {finishedCount >= yearlyGoal && yearlyGoal > 0 && (
          <p className="progress-card__congrats">Goal reached! Keep it up!</p>
        )}
      </Card>

      <Button variant="primary" size="lg" fullWidth onClick={onAddBook}>
        + Add book
      </Button>
    </div>
  )
}
