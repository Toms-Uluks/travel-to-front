import React, { Component } from 'react';
import '../../css/common.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Cookies from 'js-cookie';


class Triprequest extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            passengers: 1
        }
        
    }
    render() { 
        var numberArr = [];
        for(var i = 1; i < this.props.maxSpace + 1; i++) {
            numberArr.push(i);
        }
        const handleSubmit = (event) => {
            event.preventDefault();
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };
            const form = event.currentTarget;
            Axios.post("https://travel-to-api.herokuapp.com/api/tripRequests",{
                trip_id: this.props.tripID,
                number_of_passengers: this.state.passengers,
                message: form.formGroupMessage.value
            }, config).then(res => {
                if (res.data.status = 'success') {
                    this.props.onSuccess(false)
                }
            })
        }
        const CategorySelector = (evt) => {
            this.setState({
                passengers: evt
            })
        }
        return (  

            <div className="trip-request-wrap">
                <div className="trip-request-box">
                    <Form className="flex-column" onSubmit={handleSubmit}>
                        <div className="flex-row flex-start-center">
                            <div>Number of passengers</div>
                            <Dropdown onSelect={(evt) => {CategorySelector(evt)}}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.passengers}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {numberArr.map(x => {
                                        return (<Dropdown.Item key={x} eventKey={x}>{x}</Dropdown.Item>)
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Form.Group controlId="formGroupMessage">
                            <Form.Control type="text" placeholder="Message" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send trip request
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Triprequest;