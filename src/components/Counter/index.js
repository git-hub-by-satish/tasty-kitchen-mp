import './index.css'

const Counter = props => {
  const {quantity, onIncrement, onDecrement, addItem} = props

  const onClickAddBtn = () => {
    addItem()
  }

  const onClickIncrement = () => {
    onIncrement()
  }

  const onClickDecrement = () => {
    onDecrement()
  }

  return quantity > 0 ? (
    <div className="items-counter">
      <button className="dec-inc-btn" type="button" onClick={onClickDecrement}>
        -
      </button>
      <div className="item-quantity">{quantity}</div>
      <button className="dec-inc-btn" type="button" onClick={onClickIncrement}>
        +
      </button>
    </div>
  ) : (
    <button onClick={onClickAddBtn} type="button" className="food-add-btn">
      ADD
    </button>
  )
}

export default Counter
