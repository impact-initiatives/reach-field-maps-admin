import gql from 'graphql-tag';

export const createDocument = gql`
  mutation createDocument(
    $file: String!
    $title: String!
    $documentType: DocumentTypes!
    $fileType: FileTypes!
    $clusters: [Clusters!]!
    $organizations: [Organizations!]!
    $donors: [Donors!]!
    $washTypes: [WashTypes!]!
    $admin0: [Admin0!]!
    $admin1: [Admin1!]!
    $admin2: [Admin2!]!
    $createdAt: AWSTimestamp!
    $createdBy: AWSEmail!
    $updatedAt: AWSTimestamp!
    $updatedBy: AWSEmail!
    $status: Status!
  ) {
    createDocument(
      file: $file
      title: $title
      documentType: $documentType
      fileType: $fileType
      clusters: $clusters
      organizations: $organizations
      donors: $donors
      washTypes: $washTypes
      admin0: $admin0
      admin1: $admin1
      admin2: $admin2
      createdAt: $createdAt
      createdBy: $createdBy
      updatedAt: $updatedAt
      updatedBy: $updatedBy
      status: $status
    ) {
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

export const updateDocument = gql`
  mutation updateDocument(
    $id: ID!
    $file: String!
    $title: String!
    $documentType: DocumentTypes!
    $fileType: FileTypes!
    $clusters: [Clusters!]!
    $organizations: [Organizations!]!
    $donors: [Donors!]!
    $washTypes: [WashTypes!]!
    $admin0: [Admin0!]!
    $admin1: [Admin1!]!
    $admin2: [Admin2!]!
    $updatedAt: AWSTimestamp!
    $updatedBy: AWSEmail!
    $status: Status!
  ) {
    updateDocument(
      id: $id
      file: $file
      title: $title
      documentType: $documentType
      fileType: $fileType
      clusters: $clusters
      organizations: $organizations
      donors: $donors
      washTypes: $washTypes
      admin0: $admin0
      admin1: $admin1
      admin2: $admin2
      updatedAt: $updatedAt
      updatedBy: $updatedBy
      status: $status
    ) {
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
