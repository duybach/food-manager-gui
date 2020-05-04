import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import FoodManager from './components/FoodManager';
import FoodWorker from './components/FoodWorker';
import OrderQueue from './components/OrderQueue';

function Worker() {
  let { id } = useParams();

  return (
    <FoodWorker id={id} />
  );
}

for (let x in this) {
  alert(x);
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Navbar bg="dark" variant="dark" className="py-3" fixed="top">
      <Navbar.Brand href="/">FoodManager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={window.location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/worker/1">Worker 1</Nav.Link>
          <Nav.Link href="/worker/2">Worker 2</Nav.Link>
          <Nav.Link href="/queue">Queue</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Router>
        <Switch>
          <Route path="/queue">
            <OrderQueue />
          </Route>
          <Route path="/worker/:id" children={<Worker />} />
          <Route path="/">
            <FoodManager />
          </Route>
        </Switch>
    </Router>

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="bottom" className="footer">
      <Nav className="mr-auto">
        <Navbar.Text>
          Created by <a href="https://github.com/ngynch" target="_blank" rel="noopener noreferrer">Cong Huan Nguyen</a> & <a href="http://github.com/duybach" target="_blank" rel="noopener noreferrer">Duy Bach Nguyen</a>
        </Navbar.Text>
      </Nav>
      <Nav>
        <Navbar.Text>
          <a href="#top">Back to top</a>
        </Navbar.Text>
      </Nav>
    </Navbar>
  </React.StrictMode>,
  document.getElementById('root')
);
