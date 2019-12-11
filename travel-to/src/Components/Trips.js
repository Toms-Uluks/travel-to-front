import React, { Component } from 'react';
import { Topbar } from './Common/Topbar';

class Trips extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: null,
        }
    }
    
    render() { 
        return (  
            <div>
                <Topbar user={this.state.user}></Topbar>
            </div>
        );
    }
}
 
export default Trips;