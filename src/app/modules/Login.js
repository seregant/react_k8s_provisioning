const React = require('react')
const axios = require('axios')
const qs = require('querystring')

class Login extends React.Component {
    state = {
        user: '',
        password: '',
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
        console.log(qs.stringify(requestBody))
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'login/', qs.stringify(requestBody) ,config)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username / Email:
                    <input type="text" name="user" onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Password :
                    <input type="text" name="password" onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Login