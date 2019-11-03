import React from 'react';
import axios from 'axios';

class DataPengguna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + 'pengguna/')
        .then((result)=> result.data)
        .then((data)=> {
            return this.setState({
                items: data.data
            })
        })
    }

    render() {
        const {items} = this.state;
        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            Nama
                        </th>
                        <th>
                            Alamat
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0 ? items.map(item => {
                            const {nama, alamat} = item;
                            return(
                                <tr>
                                    <td>{nama}</td>
                                    <td>{alamat}</td>
                                </tr>
                            );
                        }) : null
                    }
                </tbody>
            </table>
        )
    }
}

export default DataPengguna