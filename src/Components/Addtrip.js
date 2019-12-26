import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from './Common/Topbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/Addtrip.scss';
import {SingleDatePicker} from 'react-dates';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    console.log(state.user)
    return state.user
}
class Addtrip extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            date: null,
            focused: null,
            redirectStr: null
        }
    }
    render() { 
        const handleDateChange = (evt) => {
            this.setState(
                {date: evt}
            )
        }
        const handleSubmit = event => {
            event.preventDefault();
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };
            const form = event.currentTarget;
            if(this.state.date) {
                Axios.post("https://travel-to-api.herokuapp.com/api/trips", {
                    from: form.formGroupFrom.value,
                    to: form.formGroupTo.value,
                    departure_time: this.state.date,
                    number_of_passengers: form.formGroupPassengers.value,
                    price: form.formGroupPrice.value
                }, config).then(res => {
                    if(res.data.status === 'success') {
                        this.setState({redirectStr: '/trip/'+res.data.data.id})
                    }
                })
            }
        }
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                {this.state.redirectStr ?  <Redirect to={this.state.redirectStr} /> : null} 
                <div className="flex-row">
                    <div className="add-trip-form flex-column flex-center-start">
                        <div className="form-headline">Add Trip</div>
                        <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formGroupFrom">
                                    <Form.Control required type="text" placeholder="From" />
                                </Form.Group>
                                <Form.Group controlId="formGroupTo">
                                    <Form.Control required type="text" placeholder="To" />
                                </Form.Group>
                                <Form.Group className="flex-start-center" controlId="formGroupDate">
                                    <SingleDatePicker
                                        inputIconPosition="after"
                                        small={true}
                                        block={false}
                                        numberOfMonths={1}
                                        date={this.state.date}
                                        onDateChange={date => handleDateChange(date)}
                                        focused={this.state.focused}
                                        onFocusChange={({ focused }) =>
                                        this.setState({ focused })
                                        }
                                        openDirection="down"
                                        hideKeyboardShortcutsPanel={true}
                                        
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassengers">
                                    <Form.Control required type="text" placeholder="Number of passengers" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPrice">
                                    <Form.Control required type="text" placeholder="Price per passenger" />
                                </Form.Group>
                            <div className="input-wrap">
                                <Button variant="primary" type="submit">
                                    Add Trip
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="trip-tips">
                        <div className="form-headline">Tips & Tricks</div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Addtrip);