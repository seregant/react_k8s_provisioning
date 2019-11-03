import { Redirect } from 'react-router-dom'
import React from 'react'

class Logout extends React.Component {
    state = {
        logout: false
    }
    logoutHandler = event => {
        localStorage.clear()
        this.setState({
            logout: true
        })
    }
    render(){
        if (this.state.logout) {
            return <Redirect to="/"/>
        } 
        return(
            <button type="button" onClick={this.logoutHandler}>Logout</button>
        )
    }
}

export default Logout