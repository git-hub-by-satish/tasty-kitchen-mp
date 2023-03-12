import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import NavBar from '../NavBar'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {cartList: [], isCartEmpty: true, orderPlaced: false}

  componentDidMount() {
    this.getCartList()
  }

  onPlaceOrder

  getCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    if (cartList !== null) {
      if (cartList.length !== 0) {
        this.setState({cartList, isCartEmpty: false})
      } else {
        this.setState({isCartEmpty: true})
      }
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <div className="cart-route">
        <NavBar />
        <div>
          <ul className="cart-items-list">
            {cartList.map(eachItem => (
              <CartItem
                key={eachItem.id}
                foodItemDetails={eachItem}
                quantity={eachItem.quantity}
              />
            ))}
          </ul>
          <hr className="cart-items-line" />
          <div className="cart-order-total-bar">
            <h1 className="order-total-label">Order Total:</h1>
            <div>
              <div className="bill-amount-container">
                <FaRupeeSign size={14} color="#3E4C59" />
                <p className="order-total-amount">1000</p>
              </div>
              <button
                onClick={this.onPlaceOrder}
                type="button"
                className="place-order-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
