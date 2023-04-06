// import { gql } from '@apollo/client';

// export const GET_ME = gql`
// {
//     User {
//       _id
//       username
//       email
//     }
// }
// `;
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    user {
      _id
      username
      email
    }
  }
  `;
 
  

export const NEW_PROJECT = gql`
  mutation newProject($payload: String!, $projectNameInput: String!, $projectDescription: String!) {
    newProject(payload: $payload, projectNameInput: $projectNameInput, projectDescription: $projectDescription) {
      projectId
      projectNameInput
      toolType
      projectDescription
      createdAt
      iterations
    }
  }
`;
