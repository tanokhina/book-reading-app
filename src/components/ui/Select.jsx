import './Select.css'

export default function Select({ label, id, value, onChange, options }) {
  return (
    <div className="select-group">
      <label className="select-label" htmlFor={id}>{label}</label>
      <select
        className="select-field"
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
