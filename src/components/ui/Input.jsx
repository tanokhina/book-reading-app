import './Input.css'

export default function Input({ label, id, value, onChange, placeholder, type = 'text', min, max, required }) {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>{label}</label>
      <input
        className="input-field"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
      />
    </div>
  )
}
