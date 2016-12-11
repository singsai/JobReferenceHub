// import React, { Component } from 'react';
// import logo from './logo.svg';
// import References from './References';
// import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceText: '',
      referenceList: []
    };

    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleReferenceSubmit = this.handleReferenceSubmit.bind(this);
  }

  handleReferenceChange(event) {
    this.setState({referenceText: event.target.value});
    console.log(this.state.referenceText);
  }

  handleReferenceSubmit(event) {
    var data = {
      author: 'Bob',
      reference: {
        header: "Hi",
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
    event.preventDefault();
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
        <div className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <form onSubmit={this.handleReferenceSubmit}>
            <label>
              <h3>Write your reference:</h3>
              <input type="textarea" value={this.state.referenceText} onChange={this.handleReferenceChange} />
            </label> <br />
            <input type="submit" value="Submit" />
          </form>          
        </div>
        <div>
          <References references={this.state.referenceList}/>
        </div>
      </div>         
    );
  }
}
/*
        <div>
          <References references={this.props.references}/>
        </div>
*/
//export default App;
