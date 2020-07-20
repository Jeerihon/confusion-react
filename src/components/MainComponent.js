import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Contact from "./ContactComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DishDetail from "./DishdetailComponent";

import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
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
                dish={this.state.dishes.find((dish) => dish.featured)}
                promotion={this.state.promotions.find((promotion) => promotion.featured)}
                leader={this.state.leaders.find((leader) => leader.featured)}
              />
            )}
          />

          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />

          <Route
            path='/menu/:dishId'
            component={({ match }) => (
              <DishDetail
                dish={this.state.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
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

export default Main;
