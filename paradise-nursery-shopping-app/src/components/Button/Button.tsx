import type { FC } from 'react'

export type ButtonProps = {
  disabled?: boolean
  title: string
  onClick: () => void
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { disabled = false, title, onClick } = props

  return (
    <button
      className={`btn ${disabled ? 'disabled-btn' : ''}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
