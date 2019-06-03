interface AwsExports {
  Auth: {
    identityPoolId: string;
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  AWSS3: {
    bucket: string;
    region: string;
    level: string;
  };
  aws_appsync_graphqlEndpoint: string;
  aws_appsync_region: string;
  aws_appsync_authenticationType: string;
  route53: {
    admin: string;
    files: string;
    public: string;
  };
}
