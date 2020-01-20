import React, { Component } from 'react';
import '../../css/common.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {SingleDatePicker} from 'react-dates';
import Axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { toast } from 'react-toastify';

class EditTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            date: null,
            focused: false
        }
    }
    componentDidMount() {
        this.setState({
            date: moment(this.props.trip.departure_time)
        })
    }
    render() { 
        const handleSubmit = event => {
            event.preventDefault();
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };
            const form = event.currentTarget;
            if(this.state.date) {
                Axios.put("https://travel-to-api.herokuapp.com/api/trips/"+this.props.trip.id, {
                    departure_time: this.state.date,
                    number_of_passengers: form.formGroupPassengers.value,
                    price: form.formGroupPrice.value
                }, config).then(res => {
                    if(res.data.status === 'success') {
                        this.props.onSuccess(false)
                        toast.success("Trip updated!")
                    } else if (res.data.status === 'error') {
                        toast.success(res.data.message)
                    }
                }).catch(err => {
                    toast.error("Couldn't edit your trip, try again later!")
                })
            }
        }
        const handleDateChange = (evt) => {
            this.setState(
                {date: evt}
            )
        }
        if(this.props.trip) {
            return (  
                <div className="popup-wrap">
                    <div className="popup-box flex-around-center flex-column">
                        <Form className="edit-trip-box" onSubmit={handleSubmit}>
                            <div>Date of departure</div>
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
                                <div>Number of passengers</div>
                                <Form.Control defaultValue={this.props.trip.number_of_passengers} required type="text" placeholder="Number of passengers" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPrice">
                                <div>Price per passenger</div>
                                <Form.Control defaultValue={this.props.trip.price} required type="text" placeholder="Price per passenger" />
                            </Form.Group>
                            <div className="input-wrap">
                                <Button variant="primary" type="submit">
                                    Edit Trip
                                </Button>
                                <Button type="cancel" variant="danger" onClick={() => {this.props.onSuccess(false)}}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )
        }
    }
}

export default EditTrip;    