import React, { Component } from 'react';
import { Topbar } from './Common/Topbar';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import '../css/Trips.scss';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return state.user
}
class Trips extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: null,
            trips: [ ] 
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        var details = this.props.match.params.tripDetails ? this.props.match.params.tripDetails.split('_') : ['', '','']
        Axios.get("https://travel-to-api.herokuapp.com/api/trips?from="+details[0]+"&to="+details[1]+"&date="+details[2], config).then(res => {
            if(res.data.status === 'success') {
                console.log(res.data.data)
                this.setState(state => {
                    const tripList = state.trips.push(...res.data.data)
                    return {tripList}
                })
            }
        })
    }
    render() { 
        
        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                {
                    this.state.trips.map(trip => {
                        return (
                            <div key="trip.id" className="trip-wrap">
                                <div className="trip-top-wrap">
                                    <div className="trip-dates">Leaving on {trip.departureTime}</div>
                                    <Link to={"/trip/"+trip.id} className="trip-cities">{trip.from} - {trip.to}</Link>
                                </div>
                                <div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
 
export default  connect(mapStateToProps)(Trips);