import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../../css/common.scss'

const cancelTrip = (id) => {
    var config = {
        headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
    };
    Axios.put("https://travel-to-api.herokuapp.com/api/trips/"+id+"/cancel",{}, config).then(res => {
        console.log(res)
    })
}

export const Cancelwindow = (props) => {
    return (
        <div className="popup-wrap">
            <div className="popup-box">
                <div>Are you sure you want to cancel this trip?</div>
                <div className="flex-evenly-start">
                    <Button onClick={() => {cancelTrip(props.tripID); props.onSuccess(false)}} variant="primary" type="submit">
                        Yes, cancel this trip
                    </Button>
                    <Button variant="danger" onClick={() => {props.onSuccess(false)}} type="cancel">
                        I changed my mind
                    </Button>
                </div>
            </div>
        </div>
    )
}