// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

var references = [
  {
    name: 'David',
    text: 'This guy is my hero'
  },
  {
    name: 'Fiona',
    text: 'I am enamored'
  },
  {
    name: 'Tina',
    text: 'If only he were single'
  }
];

ReactDOM.render(
  <App references={references}/>,
  document.getElementById('root')
);
