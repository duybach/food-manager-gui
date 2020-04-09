import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faCar, faHome } from '@fortawesome/free-solid-svg-icons'

import EditOrderForm from './EditOrderForm';
import OrderOverview from './OrderOverview';

import {
  REACT_APP_BACKEND_URL
} from '../constants/Constants';

class FoodManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        type: 'TAKE_AWAY',
        articles: [{id: '', amount: 1}]
      },
      orders: [],
      show: false
    };

    this.handleArticleIdChange = this.handleArticleIdChange.bind(this);
    this.handleArticleAmountChange = this.handleArticleAmountChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.updateOverview = this.updateOverview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleOrderStatus = this.handleOrderStatus.bind(this);
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

  handleClose () {
    this.setState({
      show: false
    });
  }

  handleShow(event, index, type = null) {
    console.log(type);

    if (index < 0 && type !== null) {
      this.setState({
        show: true,
        order: {
          type: type,
          articles: [{id: '', amount: 1}]
        }
      });
    } else  {
      fetch(`http://${REACT_APP_BACKEND_URL}:3000/order/${index}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            show: true,
            order: res
          });
        });
    }
  }

  handleInputChange(event, input) {
    this.setState({order: {...this.state.order, [event.target.id]: event.target.value}});
  }

  handleArticleIdChange(event, index) {
    let articles = [...this.state.order.articles];
    articles[index].id = event.target.value;
    this.setState({order: {...this.state.order, articles: articles}});
  }

  handleArticleAmountChange(event, index) {
    let articles = [...this.state.order.articles];
    articles[index].amount = parseInt(event.target.value);
    this.setState({order: {...this.state.order, articles: articles}});
  }

  addArticle(event) {
    this.setState({order: {...this.state.order, articles:  [...this.state.order.articles, {id: '', amount: 1}]}});
  }

  removeArticle(event, index) {
    let articles =  [...this.state.order.articles];
    articles.splice(index, 1);
    this.setState({order: {...this.state.order, articles: articles}});
  }

  updateOverview() {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order`)
      .then(res => res.json())
      .then(res => {
        this.setState({orders: res});
      });
  }

  handleOrderStatus(event, order_id, status) {
    let order;
    for (let tmp_order of this.state.orders) {
      if (tmp_order.id === order_id) {
        order = tmp_order;
      }
    }

    if (order) {
      fetch(`http://${REACT_APP_BACKEND_URL}:3000/order/${order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: status,
          articles: order.articles
        })
      })
        .then(() => {
          this.updateOverview();
        });
    }
  }

  handleSubmit(event) {
    let method, target_url;
    if (this.state.order.id) {
      method = 'PUT';
      target_url = '/' + this.state.order.id.toString();
    } else {
      method = 'POST';
      target_url = ''
    }

    let articles_dict = {};
    for (let article in this.state.order.articles) {
      if (this.state.order.articles[article].id.length > 0) {
        if (this.state.order.articles[article].id in articles_dict) {
          articles_dict[this.state.order.articles[article].id] += this.state.order.articles[article].amount;
        } else {
          articles_dict[this.state.order.articles[article].id] = this.state.order.articles[article].amount;
        }
      }
    }

    console.log(articles_dict);

    let articles = []
    for (let article_id in articles_dict) {
      console.log(articles);
      articles.push({id: article_id, amount: articles_dict[article_id]});
    }

    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order${target_url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.order.name,
        status: this.state.order.status,
        type: this.state.order.type,
        street: this.state.order.street,
        zipcode: this.state.order.zipcode,
        city: this.state.order.city,
        telephone: this.state.order.telephone,
        articles: articles
      })
    })
      .then(() => {
        if (this.state.show) {
          this.handleClose();
        }
        this.updateOverview();
      });

    this.setState({order: {
      name: '',
      type: 'TAKE_AWAY',
      street: '',
      zipcode: '',
      city: '',
      telephone: '',
      articles: [{id: '', amount: 1}]
    }});

    event.preventDefault();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="8">
            <Row>
              <Col>
                <h2>Alle Bestellungen</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <OrderOverview {...this.state}
                               active={true}
                               handleShow={this.handleShow}
                               handleOrderStatus={this.handleOrderStatus} />
              </Col>
            </Row>

            <Row>
              <Col>
                <hr />
              </Col>
            </Row>

            <Row>
              <Col>
                <h2>Abgeschlossene Bestellungen</h2>
              </Col>
            </Row>
            <Row>
            <Col>
              <OrderOverview {...this.state}
                             active={false}
                             handleShow={this.handleShow}
                             handleOrderStatus={this.handleOrderStatus} />
              </Col>
            </Row>
          </Col>

          <EditOrderForm {...this.state}
                         onSubmit={this.handleSubmit}
                         handleArticleIdChange={this.handleArticleIdChange}
                         handleArticleAmountChange={this.handleArticleAmountChange}
                         addArticle={this.addArticle}
                         removeArticle={this.removeArticle}
                         handleInputChange={this.handleInputChange}
                         handleClose={this.handleClose} />
        </Row>

        <Row className="fixed-bottom mb-5">
          <Col>
            <div className="float-right">
              <Button variant="danger" size="lg" className="mx-2" onClick={(e) => {this.handleShow(e, -1, 'HOUSE')}}><FontAwesomeIcon icon={faHome} /> Hier Essen</Button>
              <Button variant="danger" size="lg" className="mx-2" onClick={(e) => {this.handleShow(e, -1, 'DELIEVERY')}}><FontAwesomeIcon icon={faCar} /> Liefern</Button>
              <Button variant="danger" size="lg" className="mx-2" onClick={(e) => {this.handleShow(e, -1, 'TAKE_AWAY')}}><FontAwesomeIcon icon={faBox} /> Abholung</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FoodManager;
