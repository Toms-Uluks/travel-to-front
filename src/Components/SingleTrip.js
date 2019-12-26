import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../css/Single-Trip.scss';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Triprequest from './Common/Triprequest';
import Topbar from './Common/Topbar';

const mapStateToProps = (state) => {
    return state.user
}
class Singletrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTripRequestWindow : false, 
            trip: {
                driver: {
                    name: ""
                }
            }
        }
        this.manageTripRequest = this.manageTripRequest.bind(this)
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.get("https://travel-to-api.herokuapp.com/api/trips/"+this.props.match.params.tripID, config).then(res => {
            if(res.data.status === 'success') {
                this.setState({
                    trip: res.data.data
                })
            }
        })
    }
    getDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
    manageTripRequest(isActive) {
        this.setState({
            openTripRequestWindow: isActive
        })
    }
    render() { 
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                {this.state.openTripRequestWindow ? <Triprequest maxSpace={this.state.trip.number_of_passengers} tripID={this.state.trip.id} onSuccess={this.manageTripRequest} /> : null}
                <div className="single-trip-wrap">
                    <div className="map-wrap">

                    </div>
                    <div className="trip-info-wrap">
                        <div className="trip-cities">{this.state.trip.from} - {this.state.trip.to}</div>
                        <span className="trip-dates">Leaving on {this.getDate(this.state.trip.departure_time)}</span>
                        <span className="trip-dates">Number of passengers: {this.state.trip.number_of_passengers}</span>
                        <span className="trip-dates">Price per passanger: {this.state.trip.price}EUR</span>

                        <Button onClick={() => this.manageTripRequest(true)} variant="primary" className="contact-button" type="submit">
                            Join {this.state.trip.driver.name} on the trip
                        </Button>
                    </div>


                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Singletrip);