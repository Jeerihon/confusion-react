import React from 'react';
import { Link } from 'react-router-dom'

import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Menu = ({ dishes, onClick }) => (
  <div className="container">
    <div className="row">
        <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
            <h3>Menu</h3>
            <hr />
        </div>
    </div>

    <div className="row">
      {dishes.map((dish) => (
        <div className="col-12 col-md-5 m-1" key={dish.id}>
          <Card>
            <Link to={`/menu/${dish.id}`}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />

              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay></Link>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default Menu;