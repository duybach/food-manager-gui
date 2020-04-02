import React from 'react';
import Modal from 'react-bootstrap/Modal';

import OrderForm from './OrderForm';

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

export default EditOrderForm;
