// import React, { Component } from 'react';
// import logo from './logo.svg';
// import References from './References';
// import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceText: '', 
      referenceList: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({referenceText: event.target.value});
    console.log(this.state.referenceText);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.referenceText);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h2 className="appTitle">Welcome to React</h2>
        </div>
        <div className="formContainer">
          <form className="form" onSubmit={this.handleSubmit}>
            <label>
              <h3 className="formInstructions">Write your reference:</h3>
              <input className="appInput" type="textarea" value={this.state.referenceText} onChange={this.handleChange} />
            </label> <br />
            <input className="btn formBtn" type="submit" value="Submit" />
          </form>          
        </div>
        <div className="referenceContainer">
          <References references={this.props.references}/>
        </div>
      </div>         
    );
  }
}

//export default App;
