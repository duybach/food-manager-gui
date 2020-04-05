import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
              <option value="TAKE_AWAY">Abholung</option>
              <option value="DELIEVERY">Lieferung</option>
              <option value="HOUSE">Hier essen</option>
            </Form.Control>
          </Col>
        </Form.Row>
        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="street" className="col-form-label">Straße</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="street" type="text" className="form-control" required value={this.props.order.street} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="zipcode" className="col-form-label">PLZ</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="zipcode" type="text" className="form-control" required value={this.props.order.zipcode} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="city" className="col-form-label">Stadt</Form.Label>
          </Col>
          <Col xs="10">
            <Form.Control id="city" type="text" className="form-control" required value={this.props.order.city} onChange={(e) => {this.props.handleInputChange(e)}} />
          </Col>
        </Form.Row>

        <Form.Row className="mb-2">
          <Col xs="2">
            <Form.Label htmlFor="telephone" className="col-form-label">Telefonnummer</Form.Label>
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
            <Button variant="secondary" onClick={(e) => {this.props.addArticle(e)}}>Gericht hinzufügen</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="Submit" size="lg" block>Erstellen</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default OrderForm;
