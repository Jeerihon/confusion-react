import React, { Component }  from 'react';
import { Link } from 'react-router-dom'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";


const required = (val) => val?.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val?.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
  }

  render() {
    return (
      <>
        <Button outline type="button" onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg"></i> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="name">Rating</Label>

                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="author">Your Name</Label>

                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>

                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className="form-control"
                    rows={6}
                  />
                </Col>
              </Row>

              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

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
