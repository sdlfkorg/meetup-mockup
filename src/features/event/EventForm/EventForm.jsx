/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import moment from 'moment';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Script from "react-load-script";
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate';
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const actions = {
  createEvent,
  updateEvent
};

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return { initialValues: event };
};

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title: isRequired({message: 'The event title is required.'}),
    category: isRequired({message: 'Event category is required.'}),
    description: composeValidators(
        isRequired({message: 'Please enter the event description.'}),
        hasLengthGreaterThan(4)({message: 'Description need to be greater than 4 characters.'})
    )(),
    city: isRequired({message: 'Event location is need.'}),
    venue: isRequired({message: 'Event venue is need.'}),
    date: isRequired({message: 'Event date is need.'})
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleCitySelected = (selectedCity) => {
    geocodeByAddress(selectedCity).then(
      result => getLatLng(result[0])
    ).then(
      latlng => {
        // console.log('latlng: ', latlng);
        this.setState({
          cityLatLng:latlng
        });
      }
    ).then(() => {
      this.props.change('city', selectedCity)
    })
  }

  handleVenueSelected = (selectedVenue) => {
    geocodeByAddress(selectedVenue).then(
      result => getLatLng(result[0])
    ).then(
      latlng => {
        this.setState({
          venueLatLng:latlng
        })
      }
    ).then(() => {
      this.props.change('venue', selectedVenue)
    })
  }

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        photoURL: "/assets/user.png",
        hostedBy: 'Bob'
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  handleScriptLoaded = () => {
    this.setState({scriptLoaded: true});
  }

  render() {
    const {invalid, submitting, pristine} = this.props;
    const {scriptLoaded} = this.state;
    return (
      <Grid>
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyACQUMP3l5Va31lnSfVBuEH7juyhBFLiXU&libraries=places'
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Your event category"
                // multiple={true}
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell more about the event"
              />
              <Header sub color="teal" content="Event Location" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{type:['(cities)']}}
                placeholder="Event city"
                onSelect={this.handleCitySelected}
              />
              {scriptLoaded &&
              <Field
                name="venue"
                type="text"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  type:['(establishment)']
                }}
                placeholder="Event venue"
                onSelect={this.handleVenueSelected}
              />}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Event date"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
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
)(reduxForm({ form: "eventForm", enableReinitialize: true, validate})(EventForm));
