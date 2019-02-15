require('dotenv').config();

module.exports = {
  aws_table_name: 'users',
  aws_remote_config: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: 'us-west-2'
  }
};