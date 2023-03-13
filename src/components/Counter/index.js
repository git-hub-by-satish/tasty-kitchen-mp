import './index.css'

const Counter = props => {
  const {quantity, onIncrement, onDecrement, addItem, testIdValues} = props

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
      <button
        testid={`${testIdValues.dec}`}
        className="dec-inc-btn"
        type="button"
        onClick={onClickDecrement}
      >
        -
      </button>
      <div testid={`${testIdValues.current}`} className="item-quantity">
        {quantity}
      </div>
      <button
        testid={`${testIdValues.inc}`}
        className="dec-inc-btn"
        type="button"
        onClick={onClickIncrement}
      >
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
