const awsExports: AwsExports = {
  Auth: {
    identityPoolId: 'eu-west-1:67b93f41-7b22-4d15-8d46-7c63867751eb',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_FQgJvYQGw',
    userPoolWebClientId: '6b18io3100a8ggtau51ckqij1f',
  },
  AWSS3: {
    bucket: 'wash-im.reach-info.org',
    region: 'eu-west-1',
    level: 'public',
  },
  aws_appsync_graphqlEndpoint:
    'https://4wftryxpxbhahejnrqaimcngau.appsync-api.eu-west-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  route53: {
    admin: 'https://wash-im-admin.reach-info.org',
    files: 'https://wash-im-files.reach-info.org/files/',
    public: 'https://wash-im.reach-info.org',
  },
};

export default awsExports;
