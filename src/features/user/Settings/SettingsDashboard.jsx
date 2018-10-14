import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import {Switch, Route, Redirect} from 'react-router-dom';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotoPage from './PhotosPage';
import AccountPage from './AccountPage';

class SettingsDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          
          <Switch>
            <Redirect exact from="/settings" to="/settings/basic" />
            <Route path='/settings/basic' component={BasicPage} />
            <Route path="/settings/about" component={AboutPage} />
            <Route path="/settings/photo" component={PhotoPage} />
            <Route path="/settings/account" component={AccountPage} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <h1>Nav</h1>
          <SettingsNav/>
        </Grid.Column>
        
      </Grid>
    )
  }
}
export default SettingsDashboard;