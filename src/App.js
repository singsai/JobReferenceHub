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
    };

    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleReferenceForChange = this.handleReferenceForChange.bind(this);    
    this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
    this.handleAuthorUrlChange = this.handleAuthorUrlChange.bind(this);
    this.handleReferenceSubmit = this.handleReferenceSubmit.bind(this);
  }

  handleReferenceChange(event) {
    this.setState({referenceText: event.target.value});
    console.log(this.state.referenceText);
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
      author: this.state.authorName,
      reference: {
        referenceFor: this.state.referenceFor,
        authorUrl: this.state.authorUrl,
        body: this.state.referenceText
      }
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
    // this.props.searchYouTube({
    //   key: window.YOUTUBE_API_KEY, 
    //   query: 'japan kobe steak', 
    //   max: 5 
    // }, (videos) => { 
    //   console.log(videos);
    //   this.setState({
    //     current: videos[0],
    //     list: videos
    //   });
    };
//    console.log('current state:', this.state.current);

  render() {
    return (
      <div className="App">
          <Form 
            authorHandler={this.handleAuthorNameChange} 
            authorUrlHandler={this.handleAuthorUrlChange} 
            referenceHandler={this.handleReferenceChange} 
            referenceForHandler={this.handleReferenceForChange} 
            handleReferenceSubmit={this.handleReferenceSubmit}/>
      </div>         
    );
  }
}