import React from 'react';

import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal';

import OrderForm from './OrderForm';

class EditOrderForm extends React.Component {
  getTypeLabel() {
    if (this.props.order.type === 'TAKE_AWAY') {
      return (
        <Badge variant="info">MITNEHMEN</Badge>
      );
    } else if (this.props.order.type === 'DELIEVERY') {
      return (
        <Badge variant="info">LIEFERUNG</Badge>
      );
    } else {
      return (
        <Badge variant="info">HIER ESSEN</Badge>
      );
    }
  }

  render() {
    return (
       <Modal dialogClassName="modal-90w" show={this.props.show} onHide={this.props.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>{this.props.id ? <>Bestellung Bearbeiten</> : <>Neue Bestellung</>} {this.getTypeLabel()}</Modal.Title>
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

export default EditOrderForm;
