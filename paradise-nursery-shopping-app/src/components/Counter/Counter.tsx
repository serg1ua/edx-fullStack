import type { FC } from 'react'
import Button from '../Button/Button'
import './styles.css'

export type CounterProps = {
  count?: number
  onIncrement: () => void
  onDecrement: () => void
}

const Counter: FC<CounterProps> = ({ onDecrement, onIncrement, count = 1 }: CounterProps) => {
  return (
    <div className="counter">
      <Button classes="counter-btn" title="-" onClick={() => onDecrement()} />
      <p>{count}</p>
      <Button classes="counter-btn" title="+" onClick={() => onIncrement()} />
    </div>
  )
}

export default Counter
