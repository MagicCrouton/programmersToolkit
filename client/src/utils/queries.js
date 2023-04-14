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

export const QUERY_PROJECTS = gql `
query allProjects {
  projects {
    _id
    projectName
    initialCode
    projectDescription
    createdAt
  }
}
`

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    password
    projects {
      _id
      projectName
      initialCode
      projectDescription
      createdAt
    }
  }
}
`
export const QUERY_SINGLE_PROJECT = gql`
query ($projectId: ID!) {
  project(projectId: $projectId) {
    _id
    projectName
    initialCode
    projectDescription
    createdAt
    iterations {
      _id
      block
    }
  }
}
`