const React = require('react')
const axios = require('axios')

class PenggunaDashboard extends React.Component{
    render () {
        return (
            <center>
                THIS IS DASHBOARD <br />
                {localStorage.getItem("token")}
            </center>

        )
    }
}

export default PenggunaDashboard