import gql from 'graphql-tag';

export const listDocuments = gql`
  query listDocuments {
    listDocuments {
      id
      file
      title
      documentType
      fileType
      clusters
      organizations
      donors
      washTypes
      admin0
      admin1
      admin2
      createdAt
      createdBy
      updatedAt
      updatedBy
      status
    }
  }
`;

export const listDocumentsDelta = gql`
  query listDocumentsDelta($lastSync: AWSTimestamp!) {
    listDocumentsDelta(lastSync: $lastSync) {
      id
      file
      title
      documentType
      fileType
      clusters
      organizations
      donors
      washTypes
      admin0
      admin1
      admin2
      createdAt
      createdBy
      updatedAt
      updatedBy
      status
    }
  }
`;
