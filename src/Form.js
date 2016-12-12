var Form = (props) => (
    <form onSubmit={props.handleReferenceSubmit} className='col-lg-12'>
      <div className='form-group'>
        <label>Author Name</label>
        <input type="text" name="authorName" className='form-control' onChange={props.authorHandler}/>
      </div>
      <div className='form-group'>
        <label>URL</label>
        <input type="text" name="authorUrl" className='form-control' onChange={props.authorUrlHandler}/>
      </div>
      <div className='form-group'>
          <label>You are writing for: </label>
          <input type="text" name="referenceFor" className='form-control' onChange={props.referenceForHandler}/><br />
          <label>Write something good...</label>
          <input type="text" className='form-control' onChange={props.referenceHandler} />
        <input className="btn formBtn btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
);
