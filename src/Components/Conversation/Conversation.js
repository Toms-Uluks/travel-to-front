import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import Topbar from '../Common/Topbar';
import '../../css/Conversations.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import connection from '../../Lib/socket';
import { toast } from 'react-toastify';

const mapStateToProps = (state, ownProps) => {
    return state.user
}
class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            conversation: {
                messages: []
            }
        }
    }

    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        connection.connect(Cookies.get('userToken'));
        connection.subscribeToMessage(`conversation:${this.props.match.params.id}`, this.handleMessageAdd)

        Axios.get("https://travel-to-api.herokuapp.com/api/conversations/"+this.props.match.params.id, config).then((res, err) => {
            if(res.data.status === 'success') {
                this.setState({
                    conversation: res.data.data
                })
                console.log(res)
            }

        }).then(() => {
            this.scrollToBottom();
            //Axios.put("https://travel-to-api.herokuapp.com/api/conversations/")
        }).catch(err => {
            toast("something went wrong!")
        })
    }

    handleMessageAdd = message => {
    const { type, data } = message;

        // you could handle various types here, like deleting or editing a message
        switch (type) {
            case 'room:newMessage':
                this.setState(prevState => ({
                    conversation: {
                        ...prevState.conversation,
                        messages: [...prevState.conversation.messages, data]
                    }
                }));
                console.log('this', this.state)
            break;
            default:
        }
    };
    scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
        
    componentDidUpdate() {
    this.scrollToBottom();
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
                   receiver_id: this.props.user.id === this.state.conversation.messages[0].receiver_id ? this.state.conversation.messages[0].sender_id : this.state.conversation.messages[0].receiver_id  
               }, config).then(() => {
                   form.formGroupMessage.value = ""
               }).catch(err => {
                   toast.error("Something went wrong!")
               })
           }
        };

        const setusuerState = (status) => {
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            }
            Axios.put('https://travel-to-api.herokuapp.com/api/tripRequests/'+this.state.conversation.tripRequest.id + '/' + status, {}, config).then((res) => {
                this.componentDidMount()
            })
        }

        return (  
            <div>
                <Topbar user={this.props.user} extraInfo={this.state.conversation}></Topbar>
                <div className="message-wrap">
                    <div className="message-text-wrap">
                        {this.state.conversation.messages ? this.state.conversation.messages.map(message => {return (
                            <div className={message.sender_id === this.props.user.id ? 'my-message message' : 'message'}>
                                <p>{message.message}</p>
                            </div>
                        )}) : null}
                        <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
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
                    {this.props.user.role === "driver" && this.state.conversation.tripRequest && this.state.conversation.tripRequest.status === 'Pending' ? <div className="flex-center-center">
                        <Button variant="primary" type="submit" onClick={() => {setusuerState('accept')}}>
                            Accept passenger
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => {setusuerState('reject')}}>
                            Deny passenger
                        </Button>
                    </div> : null}
                    {this.props.user.role === "passenger" && this.state.conversation.tripRequest && this.state.conversation.tripRequest.status === 'Pending' ? <div className="flex-center-center">
                        <Button variant="primary" type="submit" onClick={() => {setusuerState('cancel')}}>
                            Cancel trip request
                        </Button>  
                    </div> : null}
                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Conversation);