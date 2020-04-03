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
import Container from 'react-bootstrap/Container';

import FoodManager from './components/FoodManager';
import FoodWorker from './components/FoodWorker';

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
    <Navbar bg="dark" variant="dark" className="py-3 my-3">
      <Navbar.Brand href="/">FoodManager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={window.location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/worker/1">Worker 1</Nav.Link>
          <Nav.Link href="/worker/2">Worker 2</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Router>
        <Switch>
          <Route path="/worker/:id" children={<Worker />} />
          <Route path="/">
            <FoodManager />
          </Route>
        </Switch>
    </Router>

    <footer className="text-muted footer">
      <Container>
        <p className="float-right mb-0">
          <a href="#top">Back to top</a>
        </p>
        <p className="mb-0">Created by <a href="https://github.com/ngynch" target="_blank" rel="noopener noreferrer">Cong Huan Nguyen</a> & <a href="http://github.com/duybach" target="_blank" rel="noopener noreferrer">Duy Bach Nguyen</a></p>
      </Container>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);
