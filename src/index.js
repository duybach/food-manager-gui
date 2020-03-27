import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


let REACT_APP_BACKEND_URL = 'localhost' // process.env['REACT_APP_BACKEND_URL']


class Order extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <h5 className="card-title">Order Nummer {this.props.id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Abholen/Liefern</h6>
                <p className="card-text">Name<br />Straße</p>
                <a href="https://google.com" className="card-link">Finish</a>
                <a href="https://google.com" className="card-link">Edit</a>
                <a href="https://google.com" className="card-link">Cancel</a>
              </div>
              <div className="col-4 my-auto">
                <h5>12:00</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class OrderOverview extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.orders.map((order, index) => (
          <Order key={index} {...order} />
        ))}
      </div>
    )
  }
}

class OrderForm extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <form className="mb-4" onSubmit={this.props.onSubmit}>
            {this.props.articles.map((article, index) => (
              <div key={index} className="form-group row">
                <div className="col-2">
                  <label htmlFor={index} className="col-form-label">Article</label>
                </div>
                <div className="col-6">
                  <input type="text" className="form-control" id="id-{index}" required value={article.id} onChange={(e) => {this.props.handleArticleIdChange(e, index)}} />
                </div>
                <div className="col-2">
                  <input type="number" className="form-control" id="amount-{index}" min="1" required value={article.amount} onChange={(e) => {this.props.handleArticleAmountChange(e, index)}} />
                </div>
                <div className="col-2">
                  <button type="button" className="btn btn-danger" onClick={(e) => {this.props.removeArticle(e, index)}}>X</button>
                </div>
              </div>
            ))}

            <div className="row mb-4">
              <div className="col">
                <button type="button" className="btn btn-secondary" onClick={(e) => {this.props.addArticle(e)}}>Add article</button>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

class FoodManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [{id: '', amount: 1}],
      orders: []
    };

    this.handleArticleIdChange = this.handleArticleIdChange.bind(this);
    this.handleArticleAmountChange = this.handleArticleAmountChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.updateOverview = this.updateOverview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.updateOverview();
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
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col">
                <h2>Order Overview</h2>
              </div>
            </div>
            <OrderOverview {...this.state} />
          </div>

          <div className="col-12 d-lg-none">
            <hr />
          </div>

          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col">
                <h2>Create Order</h2>
              </div>
            </div>
            <OrderForm {...this.state}
                       onSubmit={this.handleSubmit}
                       handleArticleIdChange={this.handleArticleIdChange}
                       handleArticleAmountChange={this.handleArticleAmountChange}
                       addArticle={this.addArticle}
                       removeArticle={this.removeArticle} />
          </div>
        </div>
      </div>
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
