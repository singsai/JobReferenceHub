var Form = (props) => (

  <div>
    <form className='formContainer' onSubmit={props.handleReferenceSubmit}>
      <label className='authorNameLbl'>Author Name:</label>
      <input className='authorNameForm' type="text" name="authorName" onChange={props.authorHandler}/>
      <br/>
      <label className='authorUrlLbl'>URL:</label>
      <input className='authorUrlForm' type="text" name="authorUrl" onChange={props.authorUrlHandler}/>
        <p className='referencedUserLbl'>A reference for:</p>
        <input className='referencedUsernameForm' type="text" name="referenceFor" onChange={props.referenceForHandler}/><br />
        <p className='referenceBodyLbl'>Write your reference here:</p>
        <textarea className='referenceBodyForm' onChange={props.referenceHandler} /> 
      <input className="btn formBtn" type="submit" value="Submit" />
    </form>          
  </div>
);

