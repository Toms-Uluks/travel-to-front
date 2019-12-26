import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import Topbar from './Common/Topbar';
import '../css/Conversations.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const mapStateToProps = (state, ownProps) => {
    return state.user
}
class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            conversation: {}
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.get("https://travel-to-api.herokuapp.com/api/conversations/"+this.props.match.params.id, config).then(res => {
            if(res.data.status == 'success') {
                this.setState({
                    conversation: res.data.data
                })
            }

        })
    }
    render() { 
        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };
            if(form.formGroupMessage.value) {
                Axios.post('https://travel-to-api.herokuapp.com/api/conversations/'+ this.state.conversation.id +'/message', {
                    message: form.formGroupMessage.value,
                    receiver_id: this.props.user.id == this.state.conversation.messages[0].receiver_id ? this.state.conversation.messages[0].sender_id : this.state.conversation.messages[0].receiver_id  
                }, config).then(() => {
                    this.componentDidMount()
                    form.formGroupMessage.value = ""
                })
            }
        };
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                <div className="message-wrap">
                    <div>
                        {this.state.conversation.messages ? this.state.conversation.messages.map(message => {return (
                            <div>
                                <p className={message.sender_id == this.props.user.id ? 'my-message message' : 'message'}>{message.message}</p>
                            </div>
                        )}) : null}
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formGroupMessage">
                                <Form.Control type="text" placeholder="Message" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Conversation);