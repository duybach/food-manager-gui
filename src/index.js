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
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col xs="8">
                <h5 className="card-title">Order Nummer {this.props.id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Abholen/Liefern</h6>
                <p className="card-text">Name<br />Straße</p>
                <a href="https://google.com" className="card-link">Finish</a>

                <Button variant="link" className="card-link p-0" onClick={this.props.handleShow}>
                  Edit
                </Button>

                <a href="https://google.com" className="card-link">Cancel</a>
              </Col>
              <Col xs="4" className="my-auto">
                <h5>12:00</h5>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

class OrderOverview extends React.Component {
  render() {
    return (
      <Row>
        {this.props.orders.map((order, index) => (
          <Order key={index} {...order}
                             handleShow={this.props.handleShow}/>
        ))}
      </Row>
    );
  }
}

class OrderForm extends React.Component {
  render() {
    return (
      <Form className="mb-4" onSubmit={this.props.onSubmit}>
        {this.props.articles.map((article, index) => (
          <Form.Row key={index}>
            <Col xs="2">
              <Form.Label htmlFor={index} className="col-form-label">Article</Form.Label>
            </Col>
            <Col xs="6">
              <Form.Control type="text" className="form-control" id="id-{index}" required value={article.id} onChange={(e) => {this.props.handleArticleIdChange(e, index)}} />
            </Col>
            <Col xs="2">
              <Form.Control type="number" className="form-control" id="amount-{index}" min="1" required value={article.amount} onChange={(e) => {this.props.handleArticleAmountChange(e, index)}} />
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
            <Button variant="primary">Submit</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

class EditOrderForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <Modal show={this.props.show} onHide={this.props.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
      articles: [{id: '', amount: 1}],
      orders: [],
      show: false
    };

    this.handleArticleIdChange = this.handleArticleIdChange.bind(this);
    this.handleArticleAmountChange = this.handleArticleAmountChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.updateOverview = this.updateOverview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.updateOverview();
  }

  handleClose () {
    this.setState({show: false});
  }

  handleShow () {
    this.setState({show: true});
  }

  handleArticleIdChange(event, index) {
    let articles = [...this.state.articles];
    articles[index].id = event.target.value;
    this.setState({articles: articles});
  }

  handleArticleAmountChange(event, index) {
    let articles = [...this.state.articles];
    articles[index].amount = parseInt(event.target.value);
    this.setState({articles: articles});
  }

  addArticle(event) {
    this.setState({articles:  [...this.state.articles, {id: '', amount: 1}]});
  }

  removeArticle(event, index) {
    let articles =  [...this.state.articles];
    articles.splice(index, 1);
    this.setState({articles: articles});
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
      body: JSON.stringify({articles: this.state.articles})
    })
      .then(() => {
        this.updateOverview();
      });

    this.setState({articles: [{id: '', amount: 1}]});

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
            <OrderOverview {...this.state}
                           handleShow={this.handleShow}/>
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
                           removeArticle={this.removeArticle} />
               </Col>
             </Row>
          </Col>

          <EditOrderForm {...this.state}
                         handleClose={this.handleClose}
                         handleShow={this.handleShow} />
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
