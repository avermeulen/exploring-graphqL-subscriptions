import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { NameUpdateListener } from "./NameUpdateListener";
import { NameList } from "./NameList";

export default function ManageNames() {
  const [currentName, setCurrentName] = useState("");

  const subscription = gql`
    subscription nameAdded {
      nameAdded (code : "123") {
        name,
        count
      }
  }`;

  useSubscription(subscription);

  return <div>
	  <h2>Filter for user</h2>
    <NameList onChange={(name) => {
      setCurrentName(name);
    }} />

    <div className="row" >
      <strong>Currently filtering for: </strong> {currentName}
    </div>

    <NameUpdateListener name={currentName} />

  </div>;


}
