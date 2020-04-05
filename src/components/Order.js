import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

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
      `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2,4)} ${date.getHours()}:${date.getMinutes()}`
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
        <Badge variant="INFO">MITNEHMEN</Badge>
      );
    } else if (this.props.type === 'DELIEVERY') {
      return (
        <Badge variant="INFO">LIEFERUNG</Badge>
      );
    } else {
      return (
        <Badge variant="INFO">HIER ESSEN</Badge>
      );
    }
  }


  render() {
    let total = 0;
    for (let article of this.props.articles) {
      total += article.price;
    }

    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title font-weight-bold">Bestellung Nummer #{this.props.id}</h5>
              <h6 className="card-subtitle mb-2">{this.getStatusLabel()} {this.getTypeLabel()}</h6>

              <p className="card-text p-0 mb-1">{this.props.name}
                {this.props.type === 'DELIVERY' &&
                  <>
                    <br />{this.props.street}<br />{this.props.zipcode} {this.props.city}
                  </>
                }
              </p>

              {this.props.status === 'TO_DO' &&
                <>
                  <Button variant="primary" className="card-link p-1 mb-2 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'IN_PROGRESS')}}>
                    Start
                  </Button>

                  <Button variant="primary" className="card-link p-1 mb-2 text-decoration-none" onClick={(e) => {this.props.handleShow(e, this.props.id)}}>
                    Edit
                  </Button>
                </>
              }

              {this.props.status !== 'COMPLETE' &&
                <>
                  <Button variant="primary" className="card-link p-1 mb-2 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'COMPLETE')}}>
                    Finish
                  </Button>

                  <Button variant="primary" className="card-link p-1 mb-2 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'CANCEL')}}>
                    Cancel
                  </Button>
                </>
              }
            </Col>
            <Col xs="4" className="my-auto">
              <h5>Zeit: {this.props.status === 'COMPLETE' ? this.getDate() : this.state.time_since_order}</h5>
            </Col>
          </Row>

          {this.props.status !== 'COMPLETE' &&
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Gericht</th>
                      <th>Anzahl</th>
                      <th>Preis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.articles.map((article, index) => (
                      <tr key={index}>
                        <td>
                           {article.alias} - {article.name}
                        </td>
                        <td>
                          {article.amount}
                        </td>
                        <td>
                          {this.inEuro(article.price)}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan="2">Total</td>
                      <td>
                        {this.inEuro(total)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default Order;
