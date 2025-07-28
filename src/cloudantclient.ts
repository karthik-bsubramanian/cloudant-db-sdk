import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

const cloudant = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY!,
  }),
  serviceUrl: process.env.CLOUDANT_URL,
});

export default cloudant;
