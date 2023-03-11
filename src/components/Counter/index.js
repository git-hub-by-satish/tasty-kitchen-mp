import {Component} from 'react'

import './index.css'

class Counter extends Component {
  constructor(props) {
    super(props)
    const {quantity} = this.props
    this.state = {quantity}
  }

  onIncrement = () => {
    const {quantity, id} = this.props
    console.log(quantity)
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    const updatedList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: quantity + 1}
      }
      return eachItem
    })
    localStorage.setItem('cart_list', JSON.stringify(updatedList))
    this.setState({quantity: quantity + 1})
  }

  render() {
    const {quantity} = this.state
    return (
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>{quantity}</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
