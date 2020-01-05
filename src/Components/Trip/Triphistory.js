import React, { Component } from 'react';
import Topbar from '../Common/Topbar';
import { connect } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import { DateTime } from 'luxon';
import '../../css/Trips.scss'

const mapStateToProps = (state) => {
    return state.user
}
class Triphistory extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            driver: [ ],
            passenger: []
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.get("https://travel-to-api.herokuapp.com/api/trips/user", config).then(res => {
            if(res.data.status === 'success') {
                this.setState({
                    driver: res.data.data.driver,
                    passenger: res.data.data.passenger
                })
            }
            console.log(res.data.data)
        })
    }
    getDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
    render() { 
        return (  
            <div className="trip-history">
                <Topbar user={this.props.user}></Topbar>
                {this.props.user.role == "driver" && this.state.driver.length > 0 ? 
                    <div>
                        <div className="trip-header">My trips</div>
                        <div>
                            {this.state.driver.map(trip => {
                                return(
                                    <div key="trip.id" className="trip-wrap">
                                        <div className="trip-top-wrap">
                                            <div className="trip-dates">{this.getDate(trip.departure_time)}</div>
                                            <Link to={"/trip/"+trip.id} className="trip-cities">{trip.from} - {trip.to}</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                : null}
                    {this.state.passenger.length > 0 ?
                        <div>
                            <div className="trip-header">Trips I've taken</div>
                            <div>
                                {this.state.passenger.map(trip => {
                                        return(
                                            <div key="trip.id" className="trip-wrap">
                                                <div className="trip-top-wrap">
                                                    <div className="trip-dates">{this.getDate(trip.departure_time)}</div>
                                                    <Link to={"/trip/"+trip.id} className="trip-cities">{trip.from} - {trip.to}</Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div> 
                        </div>
                    : null}
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Triphistory);