import React from 'react';
import Counter from './Counter';
import { useGetNames } from "./useGetNames";


export function NameList(props) {

	const { data, loading, refetch } = useGetNames();

	if (loading)
		return "...";

	if (refetch) {
		refetch();
	}
	const userList = data.names.map((user) => {
		return <option key={user.name} >
			{user.name}
		</option>;
	});

	return <div className="row" >
		<div className="col-6" >
			<Counter counter={userList.length} />

			<select className="form-control" onChange={(evt) => {
				props.onChange(evt.target.value);
			}}>
				<option value="">Select a name</option>
				{userList}
			</select>
		</div>
	</div>;
}
