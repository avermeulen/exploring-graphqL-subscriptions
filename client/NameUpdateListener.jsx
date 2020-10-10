import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { ShowThenHide } from './ShowThenHide';

export function NameUpdateListener(props) {

  const subscription = gql`
    subscription nameUpdated($name: String) {
      nameUpdated (name : $name) {
        name,
        count
      }
  }`;

  const { data } = useSubscription(subscription, {
    variables: {
      name: props.name
    }
  });

  if (data) {
    return <div>
      <ShowThenHide message={`${props.name} updated`} />
    </div>;
  }

  return "";
}
