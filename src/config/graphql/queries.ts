import gql from 'graphql-tag';

export const listMaps = gql`
  query listMaps {
    listMaps {
      id
      titleLong
      titleShort
      userGroups
      mapType
      netlifyHook
      subDomain
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export const listMapsDelta = gql`
  query listMapsDelta($lastSync: AWSTimestamp!) {
    listMapsDelta(lastSync: $lastSync) {
      id
      titleLong
      titleShort
      userGroups
      mapType
      netlifyHook
      subDomain
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
