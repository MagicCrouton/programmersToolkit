import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    
    user {
      _id
      username
      email
     
    }
    token
  }
}
`;
export const SAVE_PROJECT = gql`
    mutation saveProject($input: savedBook!) {
    savePorject (input: $input)
        {
            _id
            username
            email
            savedProjects {
                # 
                projectName
                projectId
                toolType
                projectDescription
                createdAt
                iterations
            }
        }
    }
`;


export const SEARCH_CODE = gql`
mutation searchCode($code: String) {
  searchCode(code: $code)
}
`