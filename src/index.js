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


let REACT_APP_BACKEND_URL = 'localhost' // process.env['REACT_APP_BACKEND_URL']


class Order extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs="8">
              <h5 className="card-title">Order Nummer {this.props.id}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.type}</h6>
              <p className="card-text">{this.props.name}<br />{this.props.street}</p>
              <a href="https://google.com" className="card-link">Finish</a>

              <Button variant="link" className="card-link p-0" onClick={(e) => {this.props.handleShow(e, this.props.id)}}>
                Edit
              </Button>

              <a href="https://google.com" className="card-link">Cancel</a>
            </Col>
            <Col xs="4" className="my-auto">
              <h5>Created: {this.props.created}</h5>
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
            <Form.Label htmlFor="type" className="col-form-label">Type</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="type" type="text" className="form-control" required value={this.props.order.type} onChange={(e) => {this.props.handleInputChange(e)}} />
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
            <Form.Control id="telephone" type="text" className="form-control" required value={this.props.order.telephone} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        {this.props.order.articles.map((article, index) => (
          <Form.Row key={index} className="mb-2">
            <Col xs="2">
              <Form.Label htmlFor={index} className="col-form-label">Article</Form.Label>
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
                     onSubmit={this.props.handleSubmit}
                     handleArticleIdChange={this.props.handleArticleIdChange}
                     handleArticleAmountChange={this.props.handleArticleAmountChange}
                     addArticle={this.props.addArticle}
                     removeArticle={this.props.removeArticle}
                     handleInputChange={this.props.handleInputChange}
                     handleClose={this.props.handleClose} />
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={this.props.handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={this.props.handleClose}>
             Save Changes
           </Button>
         </Modal.Footer>
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
      editOrder: null
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

  handleInputChange(event, input) {
    this.setState({order: {...this.state.order, [event.target.id]: event.target.value}});
  }

  handleClose () {
    this.setState({show: false});
  }

  handleShow (event, index) {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order/${index}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          show: true,
          order: res
        });
      });
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

  handleSubmit(event) {
    fetch(`http://${REACT_APP_BACKEND_URL}:3000/order`, {
      method: 'POST',
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
    return (
      <Container>
        <Row>
          <Col xs="12" lg="6">
            <Row>
              <Col>
                <h2>Order Overview</h2>
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
                <h2>Create Order</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <OrderForm {...this.state}
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
