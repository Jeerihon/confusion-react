import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DishDetail from "./DishdetailComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route
            path="/home"
            component={() => (
              <Home
                dish={this.props.dishes.find((dish) => dish.featured)}
                promotion={this.props.promotions.find((promotion) => promotion.featured)}
                leader={this.props.leaders.find((leader) => leader.featured)}
              />
            )}
          />

          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />

          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />

          <Route
            path='/menu/:dishId'
            component={({ match }) => (
              <DishDetail
                dish={this.props.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
              />
            )}
          />

          <Route path="/contactus" component={() => <Contact />} />

          <Redirect to="/home" />
        </Switch>

        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
