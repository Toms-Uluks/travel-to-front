import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../../css/Single-Trip.scss';
import { DateTime } from 'luxon';
import Button from 'react-bootstrap/Button';
import Triprequest from '../Common/Triprequest';
import Topbar from '../Common/Topbar';
import { Cancelwindow } from '../Common/Cancelwindow';
import { Animated } from 'react-animated-css';
import EditTrip from './EditTrip';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
    return state.user
}
class Singletrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTripRequestWindow : false, 
            openCancelWindow: false,
            openEdit: false,
            trip: {
                driver: {
                    name: "",
                }
            },
            center: {lat: 55.6760968, lng: 12.5683372},
            zoom: 4,
            locationArray: [
                {
                    city: '',
                    lat: 0,
                    lng: 0
                }
            ]
        }
        this.manageTripRequest = this.manageTripRequest.bind(this)
        this.manageCancel = this.manageCancel.bind(this)
        this.manageEdit = this.manageEdit.bind(this)
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Geocode.setApiKey("AIzaSyAJeBhbJk8JPhtZsZaY8RO9E230UyPXdy8")
        Geocode.setLanguage("en")
        Axios.get("https://travel-to-api.herokuapp.com/api/trips/"+this.props.match.params.tripID, config).then(res => {
            if(res.data.status === 'success') {
                this.setState({
                    trip: res.data.data
                })
                Geocode.fromAddress(this.state.trip.from).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        if(lat && lng) {
                            this.setState(state => {
                                const tripList = state.locationArray.push({city: 'A', lat: lat, lng: lng})
                                return {tripList, center: {lat: lat, lng: lng}}
                            })
                            //console.log(this.state.center)
                        }
                    },
                    error => {
                        //console.error(error);
                    }
                )
                Geocode.fromAddress(this.state.trip.to).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        if(lat && lng) {
                            this.setState(state => {
                                const tripList = state.locationArray.push({city: 'B', lat: lat, lng: lng})
                                return {tripList}
                            })
                        }
                    },
                    error => {
                        //console.error(error);
                    }
                )
            } else if (res.data.status === 'error') {
                toast.error(res.data.message)
            }
        }).catch(err => {
            toast.error("Couldn't get the trip. Try again later!")
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
    manageCancel(isActive) {
        this.setState({
            openCancelWindow: isActive
        })  
    }
    manageEdit(isActive){
        this.setState({
            openEdit: isActive
        })  
        if(isActive == false) {
            this.componentDidMount()
        }
    }
    render() { 
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                <Animated style={{position: "fixed", zIndex: "1"}} animateOnMount={false}  isVisible={this.state.openTripRequestWindow} animationIn="fadeIn" animationOut="fadeOut" >
                    <Triprequest maxSpace={this.state.trip.number_of_passengers} tripID={this.state.trip.id} onSuccess={this.manageTripRequest} /> 
                </Animated>
                <Animated style={{position: "fixed", zIndex: "1"}} animateOnMount={false}  isVisible={this.state.openCancelWindow} animationIn="fadeIn" animationOut="fadeOut" >
                    <Cancelwindow tripID={this.state.trip.id} onSuccess={this.manageCancel}/> 
                </Animated>
                <Animated style={{position: "fixed", zIndex: "1"}} animateOnMount={false}  isVisible={this.state.openEdit} animationIn="fadeIn" animationOut="fadeOut" >
                    <EditTrip trip={this.state.trip} onSuccess={this.manageEdit}/> 
                </Animated>
                <div className="single-trip-wrap">
                    <div className="map-wrap">
                        <div>
                            <GoogleMapReact
                            style={{position: 'unset'}}
                            bootstrapURLKeys={{ key: "AIzaSyAJeBhbJk8JPhtZsZaY8RO9E230UyPXdy8" }}
                            defaultCenter={this.state.center}
                            defaultZoom={this.state.zoom} >
                                {this.state.locationArray.map(loc => {
                                    return (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                width: '40px',
                                                height: '40px',
                                                left: '-40px' / 2,
                                                top: '-40px' / 2,
                                                border: '5px solid #062601',
                                                borderRadius: '40px',
                                                backgroundColor: 'white',
                                                textAlign: 'center',
                                                color: '#062601',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                padding: 4
                                            }}
                                            className="location-dot" 
                                            lat={loc.lat}
                                            lng={loc.lng}   
                                        >
                                            {loc.city}
                                        </div>
                                    )
                                })}
                            </GoogleMapReact> 
                        </div>
                    </div>
                    <div className="trip-info-wrap">
                        <div className="trip-cities">{this.state.trip.from} - {this.state.trip.to}</div>
                        <span className="trip-dates">Leaving on {this.getDate(this.state.trip.departure_time)}</span>
                        <span className="trip-dates">Number of passengers: {this.state.trip.number_of_passengers}</span>
                        <span className="trip-dates">Price per passanger: {this.state.trip.price}EUR</span>

                        {this.state.trip.driver_id == this.props.user.id ? 
                            <div className="flex-row flex-start-center">
                                <Button onClick={() => this.manageEdit(true)} variant="primary" className="contact-button" type="submit">
                                    Edit trip
                                </Button> 
                                <Button onClick={() => this.manageCancel(true)} variant="primary" className="contact-button" type="submit">
                                    Cancel trip
                                </Button> 
                            </div>
                        : null}
                        {this.state.trip.driver_id !== this.props.user.id ?
                            <Button onClick={() => this.manageTripRequest(true)} variant="primary" className="contact-button" type="submit">
                                Join {this.state.trip.driver.name} on the trip
                            </Button> 
                        : null}
                    </div>


                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Singletrip);