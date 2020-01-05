import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ActivateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                Your user ({this.props.match.params.userToken}) has been activated ;)
                <Link to="/">Start your journey</Link>
            </div>
        );
    }
}
 
export default ActivateUser;