import Cookies from 'js-cookie'
import {Component} from 'react'

import {Link} from 'react-router-dom'

import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {BsFilterLeft, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import NavBar from '../NavBar'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const LIMIT = 9

class Home extends Component {
  state = {
    restaurantsOffersList: [],
    restaurantsOffersApiStatus: apiStatusConstants.inProgress,
    restaurantsList: [],
    restaurantsListApiStatus: apiStatusConstants.inProgress,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurantsOffers()
    this.getRestaurantsList()
  }

  getRestaurantsOffers = async () => {
    this.setState({
      restaurantsOffersApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {offers} = data
      this.setState({
        restaurantsOffersApiStatus: apiStatusConstants.success,
        restaurantsOffersList: offers,
      })
    } else {
      this.setState({
        restaurantsOffersApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getModifiedList = restaurants =>
    restaurants.map(eachRestaurant => ({
      id: eachRestaurant.id,
      name: eachRestaurant.name,
      cuisine: eachRestaurant.cuisine,
      userRating: eachRestaurant.user_rating,
      constForTwo: eachRestaurant.cost_for_two,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuType: eachRestaurant.menu_type,
      opensAt: eachRestaurant.opens_at,
    }))

  getRestaurantsList = async () => {
    console.log('this should more')
    this.setState({restaurantsListApiStatus: apiStatusConstants.inProgress})
    const {activePage} = this.state
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {restaurants} = data
    const updatedRestaurantsList = this.getModifiedList(restaurants)
    this.setState({
      restaurantsList: updatedRestaurantsList,
      restaurantsListApiStatus: apiStatusConstants.success,
    })
  }

  renderOffersSlider = () => {
    const settings = {
      arrows: false, // this helped to avoid the overflow
      dots: true,
      dotsClass: 'slick-dots',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    const {restaurantsOffersList} = this.state

    return (
      <div className="home-carousal-section">
        <Slider {...settings}>
          {restaurantsOffersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                className="offers-img"
                src={eachOffer.image_url}
                alt="offer"
                align="center"
                style={{marginLeft: 'auto', marginRight: 'auto'}} // Important to keep slides in center
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onSelectSortBy = event => {
    console.log(event.target.value)
    this.setState({selectedSortByValue: event.target.value})
  }

  renderPopularRestaurantsList = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list">
        {restaurantsList.map(eachRestaurant => (
          <Link
            key={eachRestaurant.id}
            style={{textDecoration: 'none'}}
            to={`/restaurant/${eachRestaurant.id}`}
          >
            <li className="restaurants-list-item">
              <div>
                <img
                  className="popular-restaurant-image"
                  src={eachRestaurant.imageUrl}
                  alt="restaurant"
                />
              </div>
              <div className="popular-restaurant-details">
                <div>
                  <h1 className="popular-restaurant-name">
                    {eachRestaurant.name}
                  </h1>
                  <p className="popular-restaurant-cuisine">
                    {eachRestaurant.cuisine}
                  </p>
                </div>
                <div className="ratings-and-reviews">
                  <BsFillStarFill size={15} color="gold" />
                  <p className="popular-restaurant-rating">
                    {eachRestaurant.userRating.rating}
                  </p>
                  <p className="popular-restaurant-review">
                    ({eachRestaurant.userRating.total_reviews})
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  goToNextPage = () => {
    const {activePage} = this.state
    console.log(activePage)
    if (activePage < 20) {
      this.setState({activePage: activePage + 1})
      this.getRestaurantsList()
    }
  }

  goToPreviousPage = () => {
    const {activePage} = this.state
    console.log(activePage)
    if (activePage > 1) {
      this.setState({activePage: activePage - 1})
      this.getRestaurantsList()
    }
  }

  render() {
    const {
      restaurantsOffersApiStatus,
      restaurantsListApiStatus,
      selectedSortByValue,
      activePage,
    } = this.state
    return (
      <div className="home-route">
        <NavBar />
        {restaurantsOffersApiStatus === apiStatusConstants.inProgress ? (
          <Loader
            className="offers-loader-container"
            type="TailSpin"
            color="#F7931E"
          />
        ) : (
          this.renderOffersSlider()
        )}
        <div className="popular-restaurants-section">
          <div className="popular-restaurants-header">
            <div>
              <h1 className="popular-restaurants-heading">
                Popular Restaurants
              </h1>
              <p className="popular-restaurants-description">
                Select Your favorite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="sort-by-container">
              <BsFilterLeft />
              <label htmlFor="select" className="sort-by-label">
                Sort by&nbsp;
              </label>
              <select
                onChange={this.onSelectSortBy}
                value={selectedSortByValue}
                id="select"
                className="sort-by"
              >
                {sortByOptions.reverse().map(eachOption => (
                  <option
                    className="sort-by-option"
                    key={eachOption.id}
                    value={eachOption.value}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {restaurantsListApiStatus === apiStatusConstants.success ? (
            this.renderPopularRestaurantsList()
          ) : (
            <Loader
              className="offers-loader-container"
              type="TailSpin"
              color="#F7931E"
            />
          )}
          <div className="pagination-buttons-bar">
            <button
              onClick={this.goToPreviousPage}
              type="button"
              className="pagination-btn"
            >
              <IoIosArrowBack size={15} />
            </button>
            <p className="page-no">{activePage} of 20</p>
            <button
              onClick={this.goToNextPage}
              type="button"
              className="pagination-btn"
            >
              <IoIosArrowForward size={15} />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
