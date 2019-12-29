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
            }
            console.log(res.data.data)
        })
    }
    checkUnread(conversation) {
        if (!conversation.messages[conversation.messages.length - 1].read && this.props.user.id != conversation.messages[conversation.messages.length - 1].sender_id) {
            return true
        } else {
            return false
        }
    }

    render() { 
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                {this.state.convoList.map(conversation => {return(
                    <Link className="flex-center-start flex-column convo-wrap" to={"/conversations/" + conversation.id}>
                        <div className="convo-headline">{conversation.trip.from + ' - ' + conversation.trip.to}</div>
                        <div className={this.checkUnread(conversation) ? 'unread' : 'read'} >{conversation.messages[conversation.messages.length - 1].sender.name + ': ' + conversation.messages[conversation.messages.length - 1].message}</div>
                    </Link>
                )})}
                {this.state.convoList.length == 0 ? <div className="no-messages">You don't have any conversations yet</div> : null}
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Conversationlist);