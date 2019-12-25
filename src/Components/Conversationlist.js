import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Topbar from './Common/Topbar';

const mapStateToProps = (state, ownProps) => {
    return state.user
}
class Conversationlist extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            convoList: []
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.get("https://travel-to-api.herokuapp.com/api/conversations/", config).then(res => {
            if(res.data.status == 'success') {
                this.setState({
                    convoList: res.data.data
                })
                console.log(res)
            }
        })
    }

    render() { 
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                {this.state.convoList.map(conversation => {return(
                    <Link to={"/conversations/" + conversation.id}>
                        {conversation.id}
                    </Link>
                )})}
                {this.state.convoList.length == 0 ? <div className="no-messages">You don't have any conversations yet</div> : null}
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Conversationlist);