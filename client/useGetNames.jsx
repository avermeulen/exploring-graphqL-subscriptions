import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


export function useGetNames() {
  const GET_NAMES = gql`
    query getNames {
        names {
          name
        }
    }
  `;

  return useQuery(GET_NAMES);

}
