import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style/index.css';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App/App.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
