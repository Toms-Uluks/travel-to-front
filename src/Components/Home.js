import React, { Component } from 'react';
import Topbar from './Common/Topbar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <Topbar user='1'></Topbar>
            </div>
        );
    }
}
 
export default Home;