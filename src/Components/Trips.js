import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import '../css/Trips.scss';
import Topbar from './Common/Topbar';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import {setUser} from '../modules/actions';
import { Filter } from './Common/Filter';

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
            enableFilter: false
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        var details = this.props.match.params.tripDetails ? this.props.match.params.tripDetails.split('_') : ['', '','']
        Axios.get("https://travel-to-api.herokuapp.com/api/trips?from="+details[0]+"&to="+details[1]+"&date="+details[2], config).then(res => {
            if(res.data.status === 'success') {
                this.setState(state => {
                    const tripList = state.trips.push(...res.data.data)
                    return {tripList}
                })
            }
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
                                            <div key="trip.id" className="trip-wrap">
                                                <div className="trip-top-wrap">
                                                    <div className="trip-dates">
                                                        <span className="driver-name">{trip.driver.name}</span> is leaving on {this.getDate(trip.departure_time)}
                                                        </div>
                                                    <Link to={"/trip/"+trip.id} className="trip-cities">{trip.from} - {trip.to}</Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="trips-map-wrap">

                    </div>
                </div>
            </div>
        );
    }
}
 
export default  connect(mapStateToProps,mapDispatchToProps)(Trips);