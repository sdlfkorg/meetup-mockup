import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import { Route, Switch} from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';


class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path='/' exact component={HomePage} />
          </Switch>
          <Route
            path='/(.+)'
            render={() => (
              <div>
                <NavBar/>
                <Container className="main">
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/events/:id' component={EventDetailedPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                </Switch>
                </Container>
              </div>

            )}
          >

          </Route>

        </div>
        
        
        

      </div>
    );
  }
}

export default App;
