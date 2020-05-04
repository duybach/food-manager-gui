import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Order extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.status !== 'COMPLETE') {
      let seconds_since_order = Math.round((new Date()).getTime() / 1000
        - (this.props.created / 1000))

      this.state = {
        seconds_since_order: seconds_since_order,
        time_since_order: this.toMinutesWithSeconds(seconds_since_order)
      };
    } else {
      this.state = {
        date: this.getDate()
      }
    }
  }

  componentDidMount() {
    if (this.props.status !== 'COMPLETE') {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  toMinutesWithSeconds(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  tick() {
    let new_time_in_seconds = this.state.seconds_since_order + 1;
    this.setState({
      seconds_since_order: new_time_in_seconds,
      time_since_order: this.toMinutesWithSeconds(new_time_in_seconds)
    });
  }

  inEuro(cents) {
    return (cents / 100).toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
  }

  getDate() {
    let date = new Date(this.props.created * 1);

    return (
      `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2,4)} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    );
  }

  getStatusLabel() {
    if (this.props.status === 'TO_DO') {
      return (
        <Badge variant="secondary">TO DO</Badge>
      );
    } else if (this.props.status === 'IN_PROGRESS') {
      return (
        <Badge variant="warning">IN BEARBEITUNG</Badge>
      );
    } else {
      return (
        <Badge variant="success">FERTIG</Badge>
      );
    }
  }

  getTypeLabel() {
    if (this.props.type === 'TAKE_AWAY') {
      return (
        <Badge variant="info">MITNEHMEN</Badge>
      );
    } else if (this.props.type === 'DELIEVERY') {
      return (
        <Badge variant="info">LIEFERUNG</Badge>
      );
    } else {
      return (
        <Badge variant="info">HIER ESSEN</Badge>
      );
    }
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title font-weight-bold">Bestellung {this.props.name}</h5>
              <h6 className="card-subtitle mb-2">{this.getStatusLabel()} {this.getTypeLabel()}</h6>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default Order;
