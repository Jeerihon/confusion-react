import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route path='/home' component={() => <Home />} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </>
    );
  }
}

export default Main;