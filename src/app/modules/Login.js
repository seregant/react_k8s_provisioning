import 'react-bulma-components/dist/react-bulma-components.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { Redirect } from 'react-router-dom'

const React = require('react')
const axios = require('axios')
const qs = require('querystring')

class Login extends React.Component {
    state = {
        user: '',
        password: '',
        logged: false,
    };


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmit = event => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const requestBody = {
            user: this.state.user,
            password: this.state.password,
        }

        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'login/', qs.stringify(requestBody) ,config)
        .then(res => {
            localStorage.setItem("token", res.data.data.token)
        }).then(() => this.setState(() => ({
            logged: true
          })))
    }
    render() {
        if (this.state.logged) {
            return <Redirect to="/dashboard" />
        }
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null){
            return <Redirect to="/dashboard" />
        }
        return(
            <div className="hero-body">
                <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <form action="" className="box" onSubmit={this.handleSubmit}>
                        <div className="field">
                        <label htmlFor="" className="label">Username</label>
                        <div className="control has-icons-left">
                            <input type="text" name="user" onChange={this.handleChange} placeholder="Username anda" className="input" required />
                            <span className="icon is-small is-left">
                            <i><FontAwesomeIcon icon={faUser} /></i>
                            </span>
                        </div>
                        </div>
                        <div className="field">
                        <label htmlFor="" className="label">Password</label>
                        <div className="control has-icons-left">
                            <input type="password" name="password" onChange={this.handleChange} placeholder="*******" className="input" required />
                            <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                        </div>
                        <div className="field">
                        <button className="button is-success">
                            Login
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Login