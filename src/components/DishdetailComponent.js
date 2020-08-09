import React from 'react';
import { Link } from 'react-router-dom'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import CommentForm from './CommentForm';

function renderDish({ image, name, description }) {
  return (
    <Card>
      <CardImg src={image} alt={name} />

      <CardBody>
        <CardTitle>{name}</CardTitle>

        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

function renderComments(comments) {
  if (!comments?.length) return <div />;

  return (
    <div>
      <h4>Comments</h4>

      <ul className="list-unstyled">
        {comments?.map(({ id, comment, author, date }) => (
          <li key={id} className="mb-2">
            <div className="mb-2">{comment}</div>

            <div>
              -- {author},{" "}
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </li>
        ))}
      </ul>

      <CommentForm />
    </div>
  );
}

const DishDetail = ({ dish, comments }) => {
  if (!dish) return <div />;

  const { image, name, description } = dish || {};

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>

          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {renderDish({ image, name, description })}
        </div>

        <div className="col-12 col-md-5 m-1">{renderComments(comments)}</div>
      </div>
    </div>
  );
};

export default DishDetail;
