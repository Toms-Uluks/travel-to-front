import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../../css/common.scss'
import { toast } from 'react-toastify';

const cancelTrip = (id) => {
    var config = {
        headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
    };
    Axios.put("https://travel-to-api.herokuapp.com/api/trips/"+id+"/cancel",{}, config).then((res, err) => {
        //console.log(res)
    }).catch(err => {
        toast.error("something went wrong!")
    })
}

export const Cancelwindow = (props) => {
    return (
        <div className="popup-wrap">
            <div className="popup-box flex-around-center flex-column">
                <div className="sub-headline " >Are you sure you want to cancel this trip? <br/> This can't be reversed</div>
                <div className="flex-evenly-start button-wrap">
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