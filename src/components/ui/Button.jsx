import './Button.css'

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', fullWidth }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
