import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

export default function useNameUpdated(name) {
  const subscription = gql`
    subscription nameUpdated($name: String) {
      nameUpdated (name : $name) {
        name,
        count
      }
  }`;

  return useSubscription(subscription, {
    variables: {
      name
    }
  });
}
