import React from 'react';

export default function Counter(props) {
  return <div className="row" >
  	<div className="col-6 ml-1 p-2" >
  		<div>User count: <span className="badge badge-primary" > {props.counter}</span> </div>
	</div>
	</div>
	
}
