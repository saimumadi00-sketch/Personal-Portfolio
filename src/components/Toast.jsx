import { useEffect, useState } from 'react'

const iconByType = {
  success: 'bi-check-circle-fill',
  danger: 'bi-x-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
  info: 'bi-info-circle-fill',
}

function ToastItem({ toast }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className={`alert alert-${toast.type} shadow d-flex align-items-center gap-2 mb-2 toast-alert ${
        visible ? 'show' : ''
      }`}
      role="alert"
    >
      <i className={`bi ${iconByType[toast.type] || iconByType.info}`}></i>
      <span>{toast.message}</span>
    </div>
  )
}

function Toast({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default Toast
