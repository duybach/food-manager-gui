import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import EditOrderForm from './components/EditOrderForm';
import OrderForm from './components/OrderForm';
import OrderOverview from './components/OrderOverview';

import {
  REACT_APP_BACKEND_URL
} from './constants/Constants';

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
  }

  handleClose () {
    this.setState({
      show: false,
      order: this.state.createOrderFallback
    });
  }

  handleShow (event, index) {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order/${index}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          show: true,
          createOrderFallback: this.state.order,
          order: res
        });
      });
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
    let order
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

  // COMPLEMETE, TO_DO, CANCELED, IN_PROGRESS

  handleSubmit(event) {
    let method, target_url;
    if (this.state.show) {
      method = 'PUT';
      target_url = '/' + this.state.order.id.toString();
    } else {
      method = 'POST';
      target_url = ''
    }

    console.log(this.state.order.type)

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
        articles: this.state.order.articles
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
    const show = this.state.show;
    let order;
    if (show) {
      order = {order: this.state.createOrderFallback};
    } else {
      order = {order: this.state.order};
    }

    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="8">
            <Row>
              <Col>
                <h2>Bestellungen Übersicht</h2>
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

            <Col xs="12">
              <hr />
            </Col>

            <Row>
              <Col>
                <h2>Abgeschlossene Bestellungen Übersicht</h2>
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

          <Col xs="12" className="d-lg-none">
            <hr />
          </Col>

          <Col xs="12" lg="4">
            <Row>
              <Col>
                <h2>Bestellung erstellen</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <OrderForm {...order}
                           onSubmit={this.handleSubmit}
                           handleArticleIdChange={this.handleArticleIdChange}
                           handleArticleAmountChange={this.handleArticleAmountChange}
                           addArticle={this.addArticle}
                           removeArticle={this.removeArticle}
                           handleInputChange={this.handleInputChange} />
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
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <FoodManager />
  </React.StrictMode>,
  document.getElementById('root')
);
