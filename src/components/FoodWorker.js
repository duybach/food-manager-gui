import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OrderArticle from './OrderArticle'

import {
  REACT_APP_BACKEND_URL
} from '../constants/Constants';

class FoodWorker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      order_articles: []
    };

    this.handleArticleOrderStatus = this.handleArticleOrderStatus.bind(this);
  }

  componentDidMount() {
    this.updateOverview();
  }

  updateOverview() {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/worker/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({order_articles: res});
      });
  }

  handleArticleOrderStatus(event, order_article_id) {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/worker/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: order_article_id
      })
    })
      .then(() => {
        this.updateOverview();
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
              <h2>Übersicht</h2>
          </Col>
        </Row>

        <Row>
          {this.state.order_articles.map((order_article, index) => (
            <Col key={index} xs="6" className="my-2">
              <OrderArticle {...order_article}
                            handleArticleOrderStatus={this.handleArticleOrderStatus}/>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default FoodWorker;
