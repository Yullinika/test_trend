import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import GoogleRest from './components/Photo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoogleRest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
