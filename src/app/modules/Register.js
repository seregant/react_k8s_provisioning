import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Redirect } from 'react-router-dom'
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
        password2:'',
        storage: '',
        provStatus: false,
        message: '',
        redirect: false,
        notifstate: "notification is-info",
        notifshow: false,
        passnotify: false
    };


    componentWillMount(){
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null){
            this.setState({
                redirect: true
            })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = event => {
        if (this.state.password === this.state.password2){
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
                provStatus: data.validation,
                message: data.details,
                notifshow: true
            })))
        } else {
            event.preventDefault();
            this.setState({
                passnotify: true
            })
        }
    }
    // componentDidUpdate(){
    //     console.log(this.state.dataSent)
    // }
    render() {
        if (this.state.provStatus) {
            return <Redirect to="/login" />
        }
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }
        return(
            <div>
                <div className="has-text-centered">
                    <h1 className="title">PROVISIONING OWNCLOUD</h1>
                    <h2 className="subtitle">Registrasi User</h2>
                </div>
                <br></br>
                {
                    this.state.notifshow ? 
                    <div className={this.state.notifstate}>
                    <button className="delete" onClick={() => this.setState({notifshow: false })}></button>
                        {this.state.message}
                    </div>
                    :null
                }
                <form action="" className="box" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor="" className="label">Nama :</label>
                        <div className="control">
                            <input type="text" name="nama" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Alamat :</label>
                        <div className="control">
                            <input type="text" name="alamat" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">E-mail :</label>
                        <div className="control">
                            <input type="text" name="email" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Username :</label>
                        <div className="control">
                            <input type="text" name="username" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Password :</label>
                        <div className="control">
                            <input type="password" name="password" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Ulangi Password :</label>
                        <div className="control">
                            <input type="password" name="password2" onChange={this.handleChange} className="input" required />
                        </div>
                    </div>
                    {
                        this.state.passnotify ?
                        <div className="field">
                            <div className="notification is-danger">
                                Verifikasi password tidak sama
                            </div>
                        </div>
                        :null
                    }
                    <div className="field">
                        <label htmlFor="" className="label">Ukuran Penyimpanan :</label>
                        <div className="control">
                            <div className="select">
                                <select className="select" name="storage" onChange={this.handleChange}>
                                    <option>Pilih ukuran </option>
                                    <option value="5">5 GB</option>
                                    <option value="10">10 GB</option>
                                    <option value="15">15 GB</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field has-text-centered">
                        <button className="button is-success">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register