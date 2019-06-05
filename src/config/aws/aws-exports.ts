const awsExports: AwsExports = {
  Auth: {
    identityPoolId: 'eu-west-1:c9fab6e0-0bbc-4605-8039-1b99010980bd',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_i7jaE6cCR',
    userPoolWebClientId: '74g7bkn4ulqg82nl6du93r5aa0',
  },
  AWSS3: {
    bucket: 'field-maps.reach-info.org',
    region: 'eu-west-1',
    level: 'public',
  },
  aws_appsync_graphqlEndpoint:
    'https://3ezfm2zzxzfcdjovl7xu4wc3mi.appsync-api.eu-west-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  route53: {
    admin: 'https://field-maps-admin.reach-info.org',
    files: '',
    public: 'https://field-maps.reach-info.org',
  },
};

export default awsExports;
