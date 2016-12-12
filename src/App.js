// import React, { Component } from 'react';
// import logo from './logo.svg';
// import References from './References';
// import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: '',
      authorUrl: '',
      referenceFor: '',
      referenceText: '',
      showProfile: true
    };

    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleReferenceForChange = this.handleReferenceForChange.bind(this);
    this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
    this.handleAuthorUrlChange = this.handleAuthorUrlChange.bind(this);
    this.handleReferenceSubmit = this.handleReferenceSubmit.bind(this);
    this.handleAddReferenceClick = this.handleAddReferenceClick.bind(this);
  }

  handleReferenceChange(event) {
        console.log(this.state.referenceText);
    this.setState({referenceText: event.target.value});

  }

  handleAuthorNameChange(event) {
    this.setState({authorName: event.target.value});
    console.log(this.state.authorName);
  }
  handleAuthorUrlChange(event) {
    this.setState({authorUrl: event.target.value});
    console.log(this.state.authorUrl);
  }
  handleReferenceForChange(event) {
    this.setState({referenceFor: event.target.value});
    console.log(this.state.referenceFor);
  }

  handleReferenceSubmit(event) {
    event.preventDefault();
    var data = {
      authorUsername: this.state.authorName,
      referencedUsername: this.state.referenceFor,
      authorUrl: this.state.authorUrl,
      body: this.state.referenceText,
      header: 'Reference'

    }

    $.ajax({
      type: 'POST',
      url: '/addreference',
      data: data
    })
    .done(function(data) {
      console.log('Submitted...', data);
    })
    .fail(function(jqXhr) {
      console.log('failed to register');
    });
    // axios.post('/addreference', data:{
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    console.log('A name was submitted: ' + this.state.referenceText);
  }

  handleAddReferenceClick(event) {
    this.setState({showProfile: !this.state.showProfile});
  }

  componentDidMount() {
    console.log('Is this working or not?');
    $.ajax({
      url: '/allreferences',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        //console.log(data);
        let tempRefs = [];
        for (var k in data) {
          //console.log(data[k].reference.body);
          this.setState({referenceList: data[k].reference.body})
        }
        console.log(this.state.referenceList);
        //return callback(data.items);
      },
      failure: () => { console.log('UNLIKELY'); }
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-lg-3">
            <a href='#' onClick={this.handleAddReferenceClick}>{this.state.showProfile ? 'Add Reference' : 'Back to Profile'}</a>
          </div>
        </div>
        <div className='row'>
          { this.state.showProfile ? <Profile /> : (<Form
                authorHandler={this.handleAuthorNameChange}
                authorUrlHandler={this.handleAuthorUrlChange}
                referenceHandler={this.handleReferenceChange}
                referenceForHandler={this.handleReferenceForChange}
                handleReferenceSubmit={this.handleReferenceSubmit} />) }
        </div>
      </div>
    );
  }
}
