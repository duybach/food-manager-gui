import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import FoodManager from './components/FoodManager';

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <FoodManager />
  </React.StrictMode>,
  document.getElementById('root')
);
