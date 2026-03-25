import './ProgressBar.css'

export default function ProgressBar({ value, max }) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
    </div>
  )
}
