import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
import {createEvent, updateEvent, deleteEvent} from '../eventActions';

const mapState = (state) => {
  return {events: state.events};
}

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
        isOpen: false,
        selectedEvent: null
    }
  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  }

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  }

  handleFormCancel = () => {
    this.setState({isOpen: false})
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    })
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const {selectedEvent} = this.state;
    const {events} = this.props;
    return (
      <Grid>
          <Grid.Column width={10}>
            <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={events} />
          </Grid.Column>
          <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {this.state.isOpen && (
            <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} handleFormCancel={this.handleFormCancel} createEvent={this.handleCreateEvent} />
          )}
          </Grid.Column>
      </Grid>
    )
  }
}
export default connect(mapState, actions)(EventDashboard);