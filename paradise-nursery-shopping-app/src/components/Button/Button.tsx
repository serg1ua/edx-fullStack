import type { FC } from 'react'

export type ButtonProps = {
  active?: boolean
  title: string
  onClick: () => void
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { active = true, title, onClick } = props

  return (
    <button
      className={`btn ${!active ? 'inactive-btn' : ''}`}
      type="button"
      onClick={onClick}
      disabled={!active}
    >
      {title}
    </button>
  )
}

export default Button
