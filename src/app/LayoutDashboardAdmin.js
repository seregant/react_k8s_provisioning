import React from 'react'
import DataNode from './modules/DataNodes'
import LogoutButton from './modules/Logout'
const DashboardAdmin = () => (
    <div className="has-text-centered">
        <div>
            <h1 className="title">PROVISIONING OWNCLOUD</h1>
            <h2 className="subtitle">Data Nodes Kubernetes</h2>
        </div>
        <br></br>
        <DataNode />
        <LogoutButton />
    </div>
)

export default DashboardAdmin