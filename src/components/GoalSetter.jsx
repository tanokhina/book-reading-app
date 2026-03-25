import { useState } from 'react'
import Button from './ui/Button.jsx'
import './GoalSetter.css'

export default function GoalSetter({ goal, booksCount, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(goal))

  const minGoal = Math.max(1, booksCount)

  const handleSave = () => {
    const parsed = parseInt(draft, 10)
    if (isNaN(parsed)) return
    const clamped = Math.min(100, Math.max(minGoal, parsed))
    onSave(clamped)
    setDraft(String(clamped))
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setDraft(String(goal))
      setEditing(false)
    }
  }

  return (
    <div className="goal-setter">
      <span className="goal-setter__label">Yearly goal</span>
      {editing ? (
        <div className="goal-setter__edit">
          <input
            className="goal-setter__input"
            type="number"
            value={draft}
            min={minGoal}
            max={100}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Yearly reading goal"
          />
          <Button size="sm" variant="primary" onClick={handleSave}>Save</Button>
          <Button size="sm" variant="ghost" onClick={() => { setDraft(String(goal)); setEditing(false) }}>Cancel</Button>
        </div>
      ) : (
        <div className="goal-setter__display">
          <span className="goal-setter__value">{goal} books</span>
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
        </div>
      )}
    </div>
  )
}
