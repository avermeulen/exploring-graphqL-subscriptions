import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export default function AddName(props) {

	const [name, setName] = useState("");

	const ADD_USER = gql`
    mutation addName($name : String!) {
      addName(name : $name)
    }
  `;

	const [mutate] = useMutation(ADD_USER);

	function addName() {
		mutate({
			variables: {
				name
			}
		}).then(function () {
			setName("");
		}).catch(function (err) {
			console.log(err);
		});
	}

	return <div className="row" >
		<div className="col-6" >
			<div className="form-group" >
				<label htmlFor="name">Enter name:</label>
				<input id="name" className="form-control" type="text" onChange={(evt) => setName(evt.target.value)} value={name} />
			</div>
			<div>
				<button className="btn btn-primary" onClick={addName} disabled={name.length < 3}>Add name</button>
			</div>
		</div>
  </div>
}
