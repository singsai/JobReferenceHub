var Form = (props) => (
  <div>
    <form onSubmit={props.handleReferenceSubmit}>
      <label>Author Name</label>
      <input type="text" name="authorName" onChange={props.authorHandler}/>
      <label>URL</label>
      <input type="text" name="authorUrl" onChange={props.authorUrlHandler}/>
        <h3>Write your reference for</h3>
        <input type="text" name="referenceFor" onChange={props.referenceForHandler}/><br />
        <input type="textarea" onChange={props.referenceHandler} /> 
      <input className="btn formBtn" type="submit" value="Submit" />
    </form>          
  </div>
);