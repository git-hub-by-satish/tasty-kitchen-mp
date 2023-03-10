import {BsTwitter} from 'react-icons/bs'
import {FaPinterestSquare, FaFacebookSquare} from 'react-icons/fa'
import {SiInstagram} from 'react-icons/si'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="website-footer-logo-name-container">
        <img
          className="footer-website-logo"
          alt="website-footer-logo"
          src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678439016/Tasty%20Kitchen/website-footer-logo_p7gsbn.png"
        />
        <h1 className="footer-website-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-about-description">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <div className="social-icons-container">
        <FaPinterestSquare
          className="social-icon"
          testid="pintrest-social-icon"
          color="#ffffff"
        />
        <SiInstagram
          className="social-icon"
          testid="instagram-social-icon"
          color="#ffffff"
        />
        <BsTwitter
          className="social-icon"
          testid="twitter-social-icon"
          color="#ffffff"
        />
        <FaFacebookSquare
          className="social-icon"
          testid="facebook-social-icon"
          color="#ffffff"
        />
      </div>
    </div>
  )
}
