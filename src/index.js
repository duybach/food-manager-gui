import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';


let REACT_APP_BACKEND_URL = 'localhost' // process.env['REACT_APP_BACKEND_URL']


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


    return (
      <Card className="{this.props.status}">
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title">{this.props.status} Order Nummer {this.props.id}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.type}</h6>
              <p className="card-text">{this.props.name}<br />{this.props.street}</p>
              <a href="https://google.com" className="card-link">Finish</a>

              <Button variant="link" className="card-link p-0" onClick={(e) => {this.props.handleShow(e, this.props.id)}}>
                Edit
              </Button>

              <a href="https://google.com" className="card-link">Cancel</a>
            </Col>
            <Col xs="4" className="my-auto">
              <h5>Created: {this.state.time_since_order}</h5>
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
                    <tr>
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

class OrderOverview extends React.Component {
  render() {
    return (
      <>
        {this.props.orders.map((order, index) => (
          <Row>
            <Col>
              <Order key={index} {...order}
                                 handleShow={this.props.handleShow}/>
            </Col>
          </Row>
        ))}
      </>
    );
  }
}

class OrderForm extends React.Component {
  render() {
    return (
      <Form className="mb-4" onSubmit={this.props.onSubmit}>
        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="name" className="col-form-label">Name</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="name" type="text" className="form-control" required value={this.props.order.name} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="type" className="col-form-label">Art</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="type" as="select" value={this.props.order.type} onChange={(e) => {this.props.handleInputChange(e)}} required>
              <option value="TAKE_AWAY" selected>Abholung</option>
              <option value="DELIEVERY">Lieferung</option>
              <option value="HOUSE">Hier essen</option>
            </Form.Control>
          </Col>
        </Form.Row>
        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="street" className="col-form-label">Street</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="street" type="text" className="form-control" required value={this.props.order.street} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="zipcode" className="col-form-label">Zipcode</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="zipcode" type="text" className="form-control" required value={this.props.order.zipcode} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="city" className="col-form-label">City</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="city" type="text" className="form-control" required value={this.props.order.city} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="telephone" className="col-form-label">Telephone</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="telephone" type="tel" className="form-control" required value={this.props.order.telephone} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        {this.props.order.articles.map((article, index) => (
          <Form.Row key={index} className="mb-2">
            <Col xs="2">
              <Form.Label htmlFor={index} className="col-form-label">Gericht</Form.Label>
            </Col>
            <Col xs="6">
              <Form.Control id={index} type="text" className="form-control" required value={article.id} onChange={(e) => {this.props.handleArticleIdChange(e, index)}} />
            </Col>
            <Col xs="2">
              <Form.Control type="number" className="form-control" min="1" required value={article.amount} onChange={(e) => {this.props.handleArticleAmountChange(e, index)}} />
            </Col>
            <Col xs="2">
              <Button variant="danger" onClick={(e) => {this.props.removeArticle(e, index)}}>X</Button>
            </Col>
          </Form.Row>
        ))}

        <Row className="mb-4">
          <Col>
            <Button variant="secondary" onClick={(e) => {this.props.addArticle(e)}}>Add article</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="Submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

class EditOrderForm extends React.Component {
  render() {
    return (
       <Modal show={this.props.show} onHide={this.props.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <OrderForm {...this.props}
                     onSubmit={this.props.onSubmit}
                     handleArticleIdChange={this.props.handleArticleIdChange}
                     handleArticleAmountChange={this.props.handleArticleAmountChange}
                     addArticle={this.props.addArticle}
                     removeArticle={this.props.removeArticle}
                     handleInputChange={this.props.handleInputChange}
                     handleClose={this.props.handleClose} />
         </Modal.Body>
       </Modal>
     );
  }
}

class FoodManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        articles: [{id: '', amount: 1}],
        name: '',
        type: '',
        street: '',
        zipcode: '',
        city: '',
        telephone: '',
      },
      orders: [],
      show: false,
      createOrderFallback: null
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
    let articles =  [...this.state.articles];
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

    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order${target_url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.order.name,
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
      type: '',
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
      <Container>
        <Row>
          <Col xs="12" lg="6">
            <Row>
              <Col>
                <h2>Bestellung Übersicht</h2>
              </Col>
            </Row>
            <Row>
            <Col>
              <OrderOverview {...this.state}
                             handleShow={this.handleShow}/>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className="d-lg-none">
            <hr />
          </Col>

          <Col xs="12" lg="6">
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
