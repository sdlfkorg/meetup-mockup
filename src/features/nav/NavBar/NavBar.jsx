import React, { Component } from 'react';
import {Menu, Container, Button} from 'semantic-ui-react';
import {NavLink, Link} from 'react-router-dom';
import SignOutMenu from '../Menu/SignOutMenu';
import SignInedMenu from '../Menu/SignInedMenu';

class NavBar extends Component {
  state = {
      authenticated: false
  }

  handleSignIn = () => {
      this.setState({
          authenticated: true
      })
  }
  
  handleSignOut = () => {
    this.setState({
        authenticated: false
    })
}

  render() {
    const {authenticated} = this.state;
    return (
        <Menu inverted fixed="top">
            <Container>
            <Menu.Item as={Link} to="/" header>
                <img src="assets/logo.png" alt="logo" />
                Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to='/events' name="Events" />
            <Menu.Item as={NavLink} to='/people' name="People" />
            <Menu.Item>
                <Button floated="right" as={Link} to="createEvent" positive inverted content="Create Event" />
            </Menu.Item>
            {authenticated ?  <SignInedMenu signOut={this.handleSignOut} /> : <SignOutMenu signIn={this.handleSignIn} />}
            
            
            </Container>
        </Menu>
    )
  }
}
export default NavBar;