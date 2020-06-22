import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderDish({ image, name, description }) {
    return (
      <Card>
        <CardImg src={image} alt={name} />

        <CardBody>
          <CardTitle>{name}</CardTitle>

          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    );
  };

  renderComments(comments) {
    if (!comments?.length) return <div />;

    return (
      <div>
        <h4>Comments</h4>

        <ul className="list-unstyled">
          {comments?.map(({ id, comment, author, date }) => (
            <li key={id} className="mb-2">
              <div className="mb-2">{comment}</div>

              <div>
                -- {author},
                {' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    if (!this.props.dish) return <div />;

    const { image, name, description, comments } = this.props.dish || {};

    return (
      this.props.dish && (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish({ image, name, description })}
            </div>

            <div className="col-12 col-md-5 m-1">
              {this.renderComments(comments)}
            </div>
          </div>
        </div>
      )
    );
  };
};

export default DishDetail
