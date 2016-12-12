var References = (props) => (
  <div id="referencelist">
    <ul>
      {props.references.map(function(ref) {
        <Reference ref={ref}/>
      })}
    </ul>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.References = References;
