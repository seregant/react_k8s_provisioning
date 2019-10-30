import { Redirect } from 'react-router-dom'
const React = require('react')
const axios = require('axios')

class PenggunaDashboard extends React.Component{
    state = {
        items: [],
        redirect: false
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
            })
        }).catch((err) => {
            this.setState({
                redirect: true
            })
        })
    }

    render () {    
        const data = this.state.items.map((item, key)=>
            <table>
                <tr colSpan="2">
                    <td><b><center>Selamat Datang {item.nama}</center></b></td>
                </tr>
                <tr colSpan="2">
                    <td><center>Berikut akses ownclud anda</center></td>
                </tr>
                <tr>
                    <td><b>Username</b></td>
                    <td>:</td>
                    <td>{item.username}</td>
                </tr>
                <tr>
                    <td><b>Password : </b></td>
                    <td>:</td>
                    <td>{item.password}</td>
                </tr>
                <tr>
                    <td><b>OwncloudUrl : </b></td>
                    <td>:</td>
                    <td>{item.oc_url}</td>
                </tr>
            </table>
        );
        if (this.state.redirect){
            localStorage.setItem("token","")
            return <Redirect to="/" />
        }
        return (
            <center>
                <table>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </center>
        )
    }
}

export default PenggunaDashboard