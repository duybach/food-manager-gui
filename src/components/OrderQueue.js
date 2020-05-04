import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OrderOverview from './OrderOverview0';

import {
  REACT_APP_BACKEND_URL
} from '../constants/Constants';



class FoodManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.updateOverview();
    this.overviewID = setInterval(
      () => this.updateOverview(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.overviewID);
  }

  updateOverview() {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order`)
      .then(res => res.json())
      .then(res => {
        this.setState({orders: res});
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="8">
            <Row>
              <Col>
                <h2>Bestellungen in Bearbeitung</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <OrderOverview {...this.state}
                               active={true} />
              </Col>
            </Row>

            <Row>
              <Col>
                <hr />
              </Col>
            </Row>

            <Row>
              <Col>
                <h2>Bestellungen Fertig</h2>
              </Col>
            </Row>
            <Row>
            <Col>
              <OrderOverview {...this.state}
                             active={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FoodManager;
