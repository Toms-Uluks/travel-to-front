import React, { Component } from 'react';
import background from '../Assets/img/landing.jpeg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../css/Landing.scss';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import Topbar from './Common/Topbar';

const mapStateToProps = (state, ownProps) => {
    return state.user
}
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state ={
            date: null,
            focused: null,
            redirectStr: null,
            user: null
          }
    }
    
    render() { 
        const handleDateChange = (evt) => {
            this.setState(
                {date: evt}
            )
        }
        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            if(!form.formGroupFrom.value && !form.formGroupTo.value && !this.state.date) {
                this.setState({redirectStr: '/trips/'})
            } else {
                var formatedDate = DateTime.fromMillis(Number(this.state.date))
                var tripDate = this.state.date ? formatedDate.year+'-'+formatedDate.month+'-'+formatedDate.day : '';
                this.setState({redirectStr: '/trips/'+ form.formGroupFrom.value+'_'+form.formGroupTo.value+'_'+tripDate})
            }
        };
        return (  
            <div className="background" style={{backgroundImage: 'url(' + background + ')'}}>
                <Topbar user={this.props.user}></Topbar>
                {this.state.redirectStr ?  <Redirect to={this.state.redirectStr} /> : null} 
                <div className="menu-section">
                    <Form onSubmit={handleSubmit}>
                        <div className="input-wrap">
                            <Form.Group controlId="formGroupFrom">
                                <Form.Control type="text" placeholder="From" />
                            </Form.Group>
                            <Form.Group controlId="formGroupTo">
                                <Form.Control type="text" placeholder="To" />
                            </Form.Group>
                        </div>
                        <div className="input-wrap">
                            <Form.Group controlId="formGroupDate">
                                <SingleDatePicker
                                    inputIconPosition="after"
                                    small={true}
                                    block={false}
                                    numberOfMonths={1}
                                    date={this.state.date}
                                    onDateChange={date => handleDateChange(date)}
                                    focused={this.state.focused}
                                    onFocusChange={({ focused }) =>
                                    this.setState({ focused })
                                    }
                                    openDirection="up"
                                    hideKeyboardShortcutsPanel={true}
                                    
                                />
                            </Form.Group>
                        </div>
                        <div className="input-wrap">
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Landing);