var References = (props) => (
  <div id="referencelist">
    <ul>
      {props.references.map((reference)=> {        
        // {console.log(reference)}       
        return <li key={reference._id}>{reference.text}</li>
      })}
    </ul>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.references = References;
