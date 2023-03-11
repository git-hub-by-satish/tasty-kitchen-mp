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

  renderDesktopNavbar = () => (
    <div className="nav-container-md">
      <div className="nav-body">
        <div className="nav-logo-name-container">
          <img
            src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678443336/Tasty%20Kitchen/Frame_274website-home-logo_syudgm.png"
            alt="website logo"
            className="nav-website-logo"
          />
          <h1 className="nav-website-name">Tasty Kitchens</h1>
        </div>
        <ul className="nav-menu-list">
          <Link style={{textDecoration: 'none'}} to="/">
            <li className="nav-menu-list-item">Home</li>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/cart">
            <li className="nav-menu-list-item">Cart</li>
          </Link>
          <li>
            <button type="button" className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )

  render() {
    const {showNavMenu} = this.state
    return (
      <>
        <div className="nav-container-sm">
          <nav className="nav-bar-sm">
            <div className="nav-logo-name-container">
              <img
                src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678443336/Tasty%20Kitchen/Frame_274website-home-logo_syudgm.png"
                alt="website logo"
                className="nav-website-logo"
              />
              <h1 className="nav-website-name">Tasty Kitchens</h1>
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
              <ul className="nav-menu-list">
                <Link style={{textDecoration: 'none'}} className to="/">
                  <li className="nav-menu-list-item">Home</li>
                </Link>
                <Link style={{textDecoration: 'none'}} to="/cart">
                  <li className="nav-menu-list-item">Cart</li>
                </Link>
                <li>
                  <button type="button" className="logout-btn">
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
        {this.renderDesktopNavbar()}
      </>
    )
  }
}

export default NavBar
