import { Redirect } from 'react-router-dom'
import LogoutButton from './Logout'

const React = require('react')
const axios = require('axios')

class PenggunaDashboard extends React.Component{
    state = {
        items: [],
        redirect: false,
        admin: false
    }

    componentWillMount() {
        const AuthStr = 'Bearer '+localStorage.getItem("token"); 
        axios.get(process.env.REACT_APP_API_URL.concat("pengguna/u"),
            { headers: { Authorization: AuthStr },
         })
        .then((res)=> res.data)
        .then((data)=>{
            console.log(data.status)
            return this.setState({
                status: data.status,
                items: data.data,
                admin: data.data[0].is_admin
            })
        }).catch((err) => {
            this.setState({
                redirect: true
            })
        })
    }

    render () {
        console.log(this.state.admin)    
        const data = this.state.items.map((item, key)=>
            <table className="table">
                <tbody>
                    <tr>
                        <td colSpan={3}><b><center>Selamat Datang {item.nama}</center></b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}><center>Berikut akses ownclud anda</center></td>
                    </tr>
                    <tr>
                        <td><b>Username</b></td>
                        <td>:</td>
                        <td>{item.username}</td>
                    </tr>
                    <tr>
                        <td><b>Password</b></td>
                        <td>:</td>
                        <td>{item.password}</td>
                    </tr>
                    <tr>
                        <td><b>OwncloudUrl</b></td>
                        <td>:</td>
                        <td><a href={"http://"+item.oc_url} target="_blank">http://{item.oc_url}</a></td>
                    </tr>
                    <tr>
                        <td colSpan={3}><center><LogoutButton /></center></td>
                    </tr>
                </tbody>
            </table>
        );
        if (this.state.redirect){
            localStorage.setItem("token","")
            return <Redirect to="/" />
        }
        if (this.state.admin === 1) {
            return <Redirect to="/admin" />
        }
        return (
            <center>
                {data}
            </center>
        )
    }
}

export default PenggunaDashboard