const React = require('react')
const axios = require('axios')
const qs = require('querystring')


class Register extends React.Component {
    state = {
        nama: '',
        alamat: '',
        email: '',
        username: '',
        password: '',
        storage: '',
        dataSent: false,
        message: ''
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
            nama: this.state.nama,
            alamat: this.state.alamat,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            storage: this.state.storage,
        }

        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'pengguna/add', qs.stringify(requestBody) ,config)
        .then(res => {
            console.log(res.data)
            return res.data
        }).then((data) => this.setState(() => ({
            dataSent: data.validation,
            message: data.details
          })))
    }
    componentDidUpdate(){
        console.log(this.state.dataSent)
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div id="message">{this.state.message}</div>
                <b>REGISTER</b>
                <table>
                    <tbody>
                        <tr>
                            <td>Nama</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="text" name="nama" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="text" name="alamat" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="text" name="email" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="text" name="username" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="password" name="password" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Storage Size</td>
                            <td>:</td>
                            <td>
                            <label>
                                <input type="text" name="alamat" onChange={this.handleChange}/>
                            </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Register