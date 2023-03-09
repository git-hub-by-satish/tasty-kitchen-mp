import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showLoginErr: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errMsg = data.error_msg
      this.setState({showLoginErr: true, errMsg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showLoginErr, errMsg} = this.state
    return (
      <div className="login-route">
        <div className="form-card-container">
          <form onSubmit={this.onSubmitLoginForm} className="login-form">
            <img
              className="website-logo-login"
              alt="website logo"
              src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678354949/Tasty%20Kitchen/website-login-logo-md_oapwsa.png"
            />
            <p className="website-name-login">Tasty Kitchen</p>
            <h1 className="login-form-heading">Login</h1>
            <div className="input-boxes">
              <label className="login-input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                className="login-input"
                id="username"
                type="text"
              />
            </div>
            <div className="input-boxes">
              <label className="login-input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                className="login-input"
                id="password"
                type="password"
              />
            </div>
            {showLoginErr && <p className="error-msg">*{errMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
