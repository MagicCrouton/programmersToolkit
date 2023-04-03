import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    User {
      _id
      username
      email
    }
}
`;