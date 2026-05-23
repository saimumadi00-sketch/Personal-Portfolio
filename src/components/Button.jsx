function Button({
  variant = 'primary',
  size,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  loading = false,
  icon,
  children,
}) {
  const buttonClassName = `btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`.trim()

  return (
    <button type={type} className={buttonClassName} onClick={onClick} disabled={disabled || loading}>
      {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
      {!loading && icon && <i className={`bi ${icon} me-2`} aria-hidden="true"></i>}
      {children}
    </button>
  )
}

export default Button
