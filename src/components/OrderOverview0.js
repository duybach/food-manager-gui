import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Order from './Order0';

class OrderOverview extends React.Component {
  render() {
    let orders = [];
    for (let order of this.props.orders) {

      if (this.props.active) {
        if (!(order.status === 'CANCEL' || order.status === 'COMPLETE' || order.status === 'TO_DO')) {
          if (order.status !== 'DELETE') {
            orders.push(order);
          }
        }
      } else {
        if (order.status === 'CANCEL' || order.status === 'COMPLETE') {
          if (order.status !== 'DELETE') {
            orders.push(order);
          }
        }
      }
    }

    return (
      <Row>
        {orders.map((order, index) => (
          <Col key={index} xs="6" className="my-2">
            <Order key={index} {...order}
                               handleShow={this.props.handleShow}
                               handleOrderStatus={this.props.handleOrderStatus} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default OrderOverview;
