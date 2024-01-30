abstract class AwsConfig{
  protected awsConfig: any = require('aws-sdk');  
  constructor(){
    this.awsConfig.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS,
      region: process.env.REGION
    });
  }
}

export default AwsConfig