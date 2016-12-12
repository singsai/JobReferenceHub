// Profile state needs an initial value for "currentUser", which is briefly displayed
// while the real user's data is being fetched.
var defaultData = {
  username: 'loading...',
  firstName: 'loading...',
  lastName: '',
  profileInfo: {
    currentCompany: 'loading...',
    role: 'loading...',
    img: 'http://striblab.github.io/startribune_dataviz/20151117-police_deaths/img/loading.gif'
  }
}

// A Profile component which models our profile page.
class Profile extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      currentUser: defaultData,
      references: []
    };
    // This will need to be changed so that you can search and input.
    this.getUserData('bob');
    this.getUserRefs('bob');
  }

  getUserData(username) {
    $.get('/user/' + username, function(data) {
      this.setState({
        currentUser: data[0]
      });
    }.bind(this));
  }

  getUserRefs(username) {
    $.post('/reference', {referencedUsername: username})
    .then(function(data) {
      this.setState({
        references: data
      });
      console.log('References:', data);
    }.bind(this));
  }

  changeUser() {
    var userVal = document.getElementById('userSearch').value;
    this.getUserData(userVal);
    this.getUserRefs(userVal);
  }

  render() {

    console.log('State is:', this.state);

    var listItems = this.state.references.map(function(item) {
      return (
        <div className='referenceRepeat'>
          <h2 className='referenceHeadline'>{item.authorUsername} says:</h2>
          <h4 className='referenceBody'>{item.body}</h4>
        </div>
      )
    });




    return (

      <div className='profContainer'>
        <input id='userSearch' />
        <button className='searchProfileBtn' onClick={this.changeUser.bind(this)}>Search</button>
        <hr/>
        <p><img className='profImg' src={this.state.currentUser.profileInfo.img}/></p> <br/>
        <p className='profName'>{this.state.currentUser.firstName + ' ' + this.state.currentUser.lastName}</p> <br/>
        <p className='profUsername'>@{this.state.currentUser.username}</p> <br/>
        <p className='profCompany'>Employer: {this.state.currentUser.profileInfo.currentCompany}</p> <br/>
        <p className='profJob'>Position: {this.state.currentUser.profileInfo.role}</p> <br/>
          <hr/>
        <div className='referenceContainer col-lg-12'>
          {listItems}
        </div>
      </div>

    )
  }
}
