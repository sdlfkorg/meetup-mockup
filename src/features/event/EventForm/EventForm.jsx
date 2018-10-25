import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";

const actions = {
  createEvent,
  updateEvent
};

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return { event };
};

class EventForm extends Component {
  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        photoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.onFormSubmit}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={TextInput}
                placeholder="Your event category"
              />
              <Field
                name="description"
                type="text"
                component={TextInput}
                placeholder="Tell more about the event"
              />
              <Header sub color="teal" content="Event Location" />
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event city"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event venue"
              />
              <Field
                name="date"
                type="text"
                component={TextInput}
                placeholder="Event date"
              />
              {/* <Form.Field>
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
                </Form.Field> */}
              <Button positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm" })(EventForm));
