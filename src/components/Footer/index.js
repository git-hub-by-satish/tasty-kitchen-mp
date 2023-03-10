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
          className="social-icon-md"
          testid="pintrest-social-icon"
          size={25}
          color="#ffffff"
        />
        <SiInstagram
          className="social-icon-md"
          testid="instagram-social-icon"
          size={25}
          color="#ffffff"
        />
        <BsTwitter
          className="social-icon-md"
          testid="twitter-social-icon"
          size={25}
          color="#ffffff"
        />
        <FaFacebookSquare
          className="social-icon-md"
          testid="facebook-social-icon"
          size={26}
          color="#ffffff"
        />
      </div>
    </div>
  )
}
