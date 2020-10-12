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
		return <li key={user.name} >
			({user.count}) {user.name}
		</li>;
	});

	return <div className="row" >
		<div className="col-6" >
			<Counter counter={userList.length} />
			<ul>
				{userList}
			</ul>
		</div>
	</div>;
}
