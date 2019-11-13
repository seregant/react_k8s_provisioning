import { Redirect } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

class DataNodes extends React.Component {
    state = {
        items: [],
        redirect: false,
        
    }


    componentDidMount(){
        this.gedata();
        this.setState({
            refreshData: setInterval(this.gedata, 5000) //refresh data every 1 minute
        })
    }

    componentWillUnmount(){
        clearInterval(this.state.refreshData)
    }

    statusColor = (status) => {
        if (status) {
            return "has-text-success"
        } else {
            return "has-text-danger"
        }
    }

    gedata = () => {
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
            <table className="table is-bordered">
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
                                    <td>{timestamp.substr(0,10)}</td>
                                    <td>{capacity.cpu}</td>
                                    <td>{capacity.memory}</td>
                                    <td className={this.statusColor(condition[5].status)}>{condition[5].status}</td>
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