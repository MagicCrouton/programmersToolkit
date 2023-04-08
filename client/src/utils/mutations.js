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
    mutation saveProject($input: savedProject!) {
    saveProject (input: $input)
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


export const NEW_PROJECT = gql`
mutation newProject($initalCode: String!, $projectName: String!, $projectDescription: String!) {
  newProject(initalCode: $initalCode, projectName: $projectName, projectdescription: $projectDescription) {
    projectName
    projectdescription
    initalCode
  }
}
`