// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// var Router = ReactRouter;
// var Route = Router.Route,
//     DefaultRoute = Router.DefaultRoute,
//     Link=Router.Link,
//     RouteHandler = Router.RouteHandler,
//     browserHistory = Router.browserHistory;


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

// var Wrapper = React.createClass({
//     render: function() {
//         return (
//         <Router history={browserHistory}>
//           <Route path="/" component={App}>
//             <Route path="/profile" component={Profile}/>
//             <Route path="/form" component={Form}/>
//           </Route>
//         </Router>
//       );
//     }
// });


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
