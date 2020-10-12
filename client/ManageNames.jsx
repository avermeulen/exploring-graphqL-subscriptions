import React, { useState } from 'react';
import { NameUpdateListener } from "./NameUpdateListener";
import { NameList } from "./NameList";
import { useNameAdded } from './useNameAdded';
import useNameUpdated from './useNameUpdated';

export default function ManageNames() {
  const [currentName, setCurrentName] = useState("");

  useNameAdded();
  useNameUpdated();

  return <div>
	  <h2>User names</h2>
    <NameList onChange={(name) => {
      setCurrentName(name);
    }} />


    <NameUpdateListener name={currentName} />

  </div>;


}
