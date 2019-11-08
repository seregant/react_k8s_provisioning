import { Redirect } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

class DataNodes extends React.Component {
    state = {
        items: [],
        redirect: false
    }

    componentDidMount(){
        const AuthStr = 'Bearer '+localStorage.getItem("token"); 
        axios.get(process.env.REACT_APP_API_URL.concat("clusters/nodes"),
            { headers: { Authorization: AuthStr },
         })
        .then((res)=> res.data)
        .then((data)=>{
            console.log(data.status)
            return this.setState({
                items: data.data
            })
        }).catch((err) => {
            this.setState({
                redirect: true
            })
        })
    }

    render(){
        const {items} = this.state
        if (this.state.redirect){
            localStorage.setItem("token","")
            return <Redirect to="/" />
        }
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Node</th>
                        <th>Tanggal Pembuatan</th>
                        <th>Kapasitas CPU</th>
                        <th>Kapasitas RAM  </th>
                        <th>Ready Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0 ? items.map(item => {
                            const {metadata, timestamp, capacity, condition} = item;
                            return(
                                <tr>
                                    <td>{metadata.name}</td>
                                    <td>{timestamp}</td>
                                    <td>{capacity.cpu}</td>
                                    <td>{capacity.memory}</td>
                                    <td>{condition[5].status}</td>
                                </tr>
                            );
                        }):null
                    }
                </tbody>
            </table>
        )
    }
}

export default DataNodes