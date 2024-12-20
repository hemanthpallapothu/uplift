import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import {Component} from 'react';
import './index.css'

class LoginPage extends Component {
    state={
        username: '',
        password: ''
    }

    onChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    onChangePassword = (event) => { 
        this.setState({password: event.target.value})
    }

    onSubmitSuccess=(jwtToken)=>{
        const {history} = this.props
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        history.replace('/')
    }

    onSubmitForm = async (event) => {
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
        console.log(data)
        if (response.ok === true) {
          this.onSubmitSuccess(data.jwt_token)
        }    
    }

    render() {
        const jwtToken = Cookies.get('jwt_token');

        return (
            <div className="login-container">   
                <div className="login-form-container">
                    <h1 className="login-heading">Login</h1>
                    <form className="form-container" onSubmit={this.onSubmitForm}>
                        <div>
                            <label className="label">Username</label>
                            <br/>
                            <input type="text" className="input" onChange={this.onChangeUsername}/>
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <br/>
                            <input type="password" className="input" onChange={this.onChangePassword}/>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default LoginPage;