import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class OrderArticle extends React.Component {
  constructor(props) {
    super(props);

    let seconds_since_order = Math.round((new Date()).getTime() / 1000
      - (this.props.created / 1000))

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

  render() {
    return (
      <Card as="Col" xs="6">
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title">Bestellung Nummer #{this.props.id}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.type}</h6>
              <p className="card-text">Nr.: {this.props.alias} {this.props.name}<br />Anzahl: {this.props.amount}</p>
              <Button variant="link" className="card-link p-0 text-decoration-none" onClick={(e) => {this.props.handleArticleOrderStatus(e, this.props.id)}}>
                Done
              </Button>
            </Col>
            <Col xs="4" className="my-auto">
              <h5>Zeit: {this.state.time_since_order}</h5>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

export default OrderArticle;
