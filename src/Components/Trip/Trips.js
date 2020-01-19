import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import '../../css/Trips.scss';
import Topbar from '../Common/Topbar';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import {setUser} from '../../modules/actions';
import { Filter } from '../Common/Filter';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
    return state.user
}
const mapDispatchToProps = dispatch => {
    return {
        dispatchActiveTrip: trip => {
            dispatch(setUser(trip))
        }
    }   
}
class Trips extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: null,
            trips: [ ],
            enableFilter: false,
            center: {lat: 55.6760968, lng: 12.5683372},
            zoom: 2,
            locationArray: [
                {
                    city: '',
                    lat: 0,
                    lng: 0
                }
            ]
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Geocode.setApiKey("AIzaSyAJeBhbJk8JPhtZsZaY8RO9E230UyPXdy8")
        Geocode.setLanguage("en")
        var details = this.props.match.params.tripDetails ? this.props.match.params.tripDetails.split('_') : ['', '','']
        Axios.get("https://travel-to-api.herokuapp.com/api/trips?from="+details[0]+"&to="+details[1]+"&date="+details[2], config).then(res => {
            if(res.data.status === 'success') {
                this.setState(state => {
                    const tripList = state.trips.push(...res.data.data)
                    return {tripList}
                })
                this.state.trips.map(trip => {
                    Geocode.fromAddress(trip.from).then(
                        response => {
                            const { lat, lng } = response.results[0].geometry.location;
                            if(lat && lng) {
                                this.setState(state => {
                                    const tripList = state.locationArray.push({city: trip.from, lat: lat, lng: lng})
                                    return {tripList}
                                })
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
                })
            }
        }).catch(err => {
            toast.error("Something went wrong!")
        })
    }
    getDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
    toggleFilter() {
        this.setState({
            enableFilter: !this.state.enableFilter
        })
    }
    render() { 
        
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                <div className="trips-main-wrap">
                    <div className="trips-list-wrap">
                        <div className="trip-list-header">
                            <div className="trip-list-headline">Newest trips</div>
                            <div className="trip-list-header-second">
                                <div>We found {this.state.trips.length} trips matching your criteria</div>
                                <div className={this.state.enableFilter ? "active-filter-btn" : "filter-btn"} onClick={() => this.toggleFilter()}>Filter</div>
                            </div>
                            {this.state.enableFilter ? <Filter/> : null}
                        </div>
                        <div>
                            <div className="trips-list">
                                {
                                    this.state.trips.map(trip => {
                                        return (
                                            <div key={trip.id+'trip'} className="trip-wrap">
                                                <div className="trip-top-wrap">
                                                    <div className="trip-dates">
                                                        <span className="driver-name">{trip.driver.name}</span> is leaving on {this.getDate(trip.departure_time)}
                                                        </div>
                                                    <Link to={"/trip/"+trip.id} className="trip-cities" data-cy={`trip-${trip.id}`} >{trip.from} - {trip.to} </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="trips-map-wrap">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAJeBhbJk8JPhtZsZaY8RO9E230UyPXdy8" }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
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
                                    {this.state.locationArray.filter(x => x.city==loc.city).length}
                                </div>
                            )
                        })}
                    </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default  connect(mapStateToProps,mapDispatchToProps)(Trips);