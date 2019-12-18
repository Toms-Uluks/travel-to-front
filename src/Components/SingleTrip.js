import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Topbar } from './Common/Topbar';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../css/Single-Trip.scss';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';

const mapStateToProps = (state) => {
    return state.user
}
class Singletrip extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            trip: {
                driver: {
                    name: ""
                }
            }
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.get("https://travel-to-api.herokuapp.com/api/trips/"+this.props.match.params.tripID, config).then(res => {
            if(res.data.status === 'success') {
                console.log(res.data.data)
                this.setState({
                    trip: res.data.data
                })
            }
        })
    }
    getDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
    render() { 
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                <div className="single-trip-wrap">
                    <div className="map-wrap">

                    </div>
                    <div className="trip-info-wrap">
                        <div className="trip-cities">{this.state.trip.from} - {this.state.trip.to}</div>
                        <span className="trip-dates">Leaving on {this.getDate(this.state.trip.departureTime)}</span>
                        <span className="trip-dates">Number of passengers: {this.state.trip.numberOfPassengers}</span>
                        <span className="trip-dates">Price per passanger: {this.state.trip.price}EUR</span>

                        <Button variant="primary" className="contact-button" type="submit">
                            Contact {this.state.trip.driver.name}
                        </Button>
                    </div>


                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Singletrip);