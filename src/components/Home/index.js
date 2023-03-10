import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import NavBar from '../NavBar'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    restaurantsOffersList: [],
    restaurantsOffersApiStatus: apiStatusConstants.inProgress,
    restaurantsList: [],
  }

  componentDidMount() {
    this.getRestaurantsOffers()
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

  render() {
    const {restaurantsOffersApiStatus} = this.state
    return (
      <>
        <NavBar />
        {restaurantsOffersApiStatus === apiStatusConstants.success ? (
          this.renderOffersSlider()
        ) : (
          <div className="offers-loader-container">
            <Loader
              type="TailSpin"
              color="#F7931E"
              height="40"
              width="40"
              testid="restaurants-offers-loader"
              strokeWidth={1}
              strokeWidthSecondary={25}
            />
          </div>
        )}

        <Footer />
      </>
    )
  }
}

export default Home
