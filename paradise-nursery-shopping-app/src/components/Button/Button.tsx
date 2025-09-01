import type { FC } from 'react'
import './styles.css'

export type ButtonProps = {
  title: string
  disabled?: boolean
  classes?: string
  onClick: () => void
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { disabled = false, classes = '', title, onClick } = props

  return (
    <button
      className={`btn ${disabled ? 'disabled-btn' : ''} ${classes}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
