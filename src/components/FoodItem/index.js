import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Counter from '../Counter'
import './index.css'

class FoodItem extends Component {
  state = {isCartHasItem: false, quantity: 0}

  componentDidMount() {
    this.checkForCartContainsItem()
  }

  checkForCartContainsItem = () => {
    const {foodItemDetails} = this.props
    const {id} = foodItemDetails
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    if (cartList !== null) {
      const cartItem = cartList.filter(eachItem => eachItem.id === id)
      if (cartItem.length !== 0) {
        this.setState({quantity: cartItem[0].quantity, isCartHasItem: true})
      }
    }
  }

  onClickAddBtn = () => {
    const {foodItemDetails} = this.props
    const cartItem = {
      id: foodItemDetails.id,
      name: foodItemDetails.name,
      cost: foodItemDetails.cost,
      quantity: 1,
    }
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    if (cartList !== null) {
      cartList.push(cartItem)
      const updatedCartList = JSON.stringify(cartList)
      localStorage.setItem('cart_list', updatedCartList)
    } else {
      localStorage.setItem('cart_list', JSON.stringify([cartItem]))
    }

    this.setState({quantity: 1, isCartHasItem: true})
  }

  render() {
    const {foodItemDetails} = this.props
    const {isCartHasItem, quantity} = this.state
    return (
      <li className="food-item-card">
        <div>
          <img
            className="food-item-img"
            src={foodItemDetails.image_url}
            alt={foodItemDetails.name}
          />
        </div>
        <div className="food-item-details">
          <h1 className="food-item-name">{foodItemDetails.name}</h1>
          <div className="food-item-cost-container">
            <FaRupeeSign size={13} />
            <p className="food-item-cost">{foodItemDetails.cost}</p>
          </div>
          <div className="food-item-ratings-container">
            <BsFillStarFill size={14} color="gold" />
            <p className="food-rating">{foodItemDetails.rating}</p>
          </div>
          {isCartHasItem ? (
            <Counter quantity={quantity} id={foodItemDetails.id} />
          ) : (
            <button
              onClick={this.onClickAddBtn}
              type="button"
              className="food-add-btn"
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
