import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Menu extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.dishes.map((dish) => (
            <div className="col-12 col-md-5 m-1" key={dish.id}>
              <Card onClick={() => this.props.onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />

                <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  };
}

export default Menu;