import {Link} from 'react-router-dom'
import {Component} from 'react'
import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'
import './index.css'

class NavBar extends Component {
  state = {showNavMenu: false}

  openNavMenu = () => {
    this.setState({showNavMenu: true})
  }

  closeNavMenu = () => {
    this.setState({showNavMenu: false})
  }

  render() {
    const {showNavMenu} = this.state
    return (
      <div>
        <nav className="nav-bar-sm">
          <div className="nav-logo-name-container">
            <img
              src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678354949/Tasty%20Kitchen/website-login-logo-md_oapwsa.png"
              alt="website logo"
              className="nav-website-logo"
            />
            <h1 className="nav-website-name-sm">Tasty Kitchens</h1>
          </div>
          <button
            onClick={this.openNavMenu}
            type="button"
            className="hamburger-toggle-button"
          >
            <FiMenu className="hamburger-icon" />
          </button>
        </nav>
        {showNavMenu && (
          <div className="nav-bar-menu-sm">
            <ul className="nav-menu-list-sm">
              <Link style={{textDecoration: 'none'}} className to="/">
                <li className="nav-menu-list-item-sm">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/cart">
                <li className="nav-menu-list-item-sm">Cart</li>
              </Link>
              <li>
                <button type="button" className="logout-btn-sm">
                  Logout
                </button>
              </li>
            </ul>
            <button
              onClick={this.closeNavMenu}
              type="button"
              className="nav-menu-close-button"
            >
              <IoIosCloseCircle className="nav-close-icon" />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default NavBar
