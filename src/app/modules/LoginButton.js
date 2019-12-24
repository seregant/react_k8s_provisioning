import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Button} from "react-bulma-components"
import { Redirect } from 'react-router-dom'
import React from 'react'

class Login extends React.Component {
    state = {
        login: false
    }
    clickHandler = event => {
        this.setState({
            login: true
        })
    }
    render(){
        if (this.state.login) {
            return <Redirect to="/login"/>
        } 
        return (
            <Button color="success" size="medium" onClick={this.clickHandler}>Login</Button>
        )
    }
}

export default Login