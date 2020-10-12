import React from 'react';
import { ShowThenHide } from './ShowThenHide';
import useNameUpdated from './useNameUpdated';

export function NameUpdateListener(props) {

  const { data } = useNameUpdated(props.name);

  if (data) {
    return <div>
      <ShowThenHide message={`${props.name} updated`} />
    </div>;
  }

  return "";
}
