import './Textarea.css'

const MAX_CHARS = 500

export default function Textarea({ label, id, value, onChange, placeholder }) {
  return (
    <div className="textarea-group">
      <label className="textarea-label" htmlFor={id}>{label}</label>
      <textarea
        className="textarea-field"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={MAX_CHARS}
        rows={4}
      />
      <span className={`textarea-counter${value.length >= MAX_CHARS ? ' textarea-counter--limit' : ''}`}>
        {value.length} / {MAX_CHARS}
      </span>
    </div>
  )
}
