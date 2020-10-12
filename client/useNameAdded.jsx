import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

export function useNameAdded() {
  const subscription = gql`
    subscription nameAdded {
      nameAdded (code : "123") {
        name,
        count
      }
  }`;

  return useSubscription(subscription);
}
