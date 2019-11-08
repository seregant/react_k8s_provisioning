import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Button} from "react-bulma-components"
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
        return (
            <Button color="danger" size="normal" onClick={this.logoutHandler}>Logout</Button>
        )
    }
}

export default Logout