var mockData = {
  username: 'bob',
  firstName: 'NotBob',
  lastName: 'Loblaw',
  profileInfo: {
    currentCompany: 'Boogle',
    role: 'Janitor',
    img: 'http://pngimg.com/upload/duck_PNG5011.png'
  }
}

class Profile extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      currentUser: mockData
    };
    // this.createUser();
    this.getUserData('bob');
  }

  getUserData(username) {

    $.get('/user/' + username, function(data) {
      console.log('Data is:', data[0]);
      this.setState({
        currentUser: data[0]
      });
      console.log('This.state:', this.state);
    }.bind(this));



    // fetch('/user/' + username)
    // .then(function(data) {
    //   return data.blob();
    // })
    // .then(function(blobData) {
    //   console.log('Data definitely is:', blobData);
    //   this.setState({
    //     currentUser: blobData
    //   });
    //   console.log('This.state:', this.state);
    // }.bind(this))
  }

  createUser() {
    fetch('/user', {method: 'POST', body: {test: 'test'}}).then(function(response) {
      console.log
    })
  }
  render() {
    return (
      <div>
        Name: {this.state.currentUser.firstName + ' ' + this.state.currentUser.lastName} <br/>
        Username: {this.state.currentUser.username} <br/>
        <img src={this.state.currentUser.profileInfo.img}/> <br/>
        Current Company: {this.state.currentUser.profileInfo.currentCompany} <br/>
        Job: {this.state.currentUser.profileInfo.role} <br/>
      </div>
    )
  }
}

