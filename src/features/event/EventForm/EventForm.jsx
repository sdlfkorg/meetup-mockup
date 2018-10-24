import React, { Component } from 'react'
import { connect } from "react-redux";
import cuid from "cuid";
import {Segment, Form, Button} from 'semantic-ui-react';
import { createEvent, updateEvent } from "../eventActions";

const actions = {
    createEvent, updateEvent
};

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };

    if (eventId && state.events.length > 0){
        event = state.events.filter(event => (event.id === eventId))[0];
    }

    return {event};

}

class EventForm extends Component {
  state = {
      event: Object.assign({}, this.props.event)
  };
  

  onFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.event.id){
        this.props.updateEvent(this.state.event);
        this.props.history.goBack();
    } else {
        const newEvent = {
            ...this.state.event,
            id: cuid(),
            photoURL: '/assets/user.png'
        }
        this.props.createEvent(newEvent);
        this.props.history.push('/events');
    }
  }

  onInputChnage = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
        event: newEvent
    })
  }

  render() {
    const {handleFormCancel} = this.props;
    const {event} = this.state;
    return (
        <Segment>
            <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
                <label>Event Title</label>
                <input name="title" onChange={this.onInputChnage} value={event.title} placeholder="Event Title" />
            </Form.Field>
            <Form.Field>
                <label>Event Date</label>
                <input name="date" onChange={this.onInputChnage} value={event.date} type="date" placeholder="Event Date" />
            </Form.Field>
            <Form.Field>
                <label>City</label>
                <input name="city" onChange={this.onInputChnage} value={event.city} placeholder="City event is taking place" />
            </Form.Field>
            <Form.Field>
                <label>Venue</label>
                <input name="venue" onChange={this.onInputChnage} value={event.venue} placeholder="Enter the Venue of the event" />
            </Form.Field>
            <Form.Field>
                <label>Hosted By</label>
                <input name="hostedBy" onChange={this.onInputChnage} value={event.hostedBy} placeholder="Enter the name of person hosting" />
            </Form.Field>
            <Button positive type="submit">
                Submit
            </Button>
            <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
        </Segment>
    )
  }
}
export default connect(mapState, actions)(EventForm);