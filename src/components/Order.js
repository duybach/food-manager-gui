import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

class Order extends React.Component {
  constructor(props) {
    super(props);

    let seconds_since_order = Math.round((new Date()).getTime() / 1000
      - ((new Date(this.props.created)).getTime() / 1000))

    this.state = {
      seconds_since_order: seconds_since_order,
      time_since_order: this.toMinutesWithSeconds(seconds_since_order)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
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

  render() {
    let total = 0;
    for (let article of this.props.articles) {
      total += article.price;
    }

    let edit_button = ''
    if (this.props.status === 'TO_DO') {
      edit_button = (
        <Button variant="link" className="card-link p-0 text-decoration-none" onClick={(e) => {this.props.handleShow(e, this.props.id)}}>
          Edit
        </Button>
      );
    }

    return (
      <Card className="">
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title">{this.props.status} Bestellung Nummer #{this.props.id}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.type}</h6>
              <p className="card-text">{this.props.name}<br />{this.props.street}</p>
              <Button variant="link" className="card-link p-0 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'IN_PROGRESS')}}>
                Start
              </Button>

              <Button variant="link" className="card-link p-0 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'COMPLETE')}}>
                Finish
              </Button>

              {edit_button}

              <Button variant="link" className="card-link p-0 text-decoration-none" onClick={(e) => {this.props.handleOrderStatus(e, this.props.id, 'CANCEL')}}>
                Cancel
              </Button>
            </Col>
            <Col xs="4" className="my-auto">
              <h5>Zeit: {this.state.time_since_order}</h5>
            </Col>
          </Row>

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
        </Card.Body>
      </Card>
    );
  }
}

export default Order;
