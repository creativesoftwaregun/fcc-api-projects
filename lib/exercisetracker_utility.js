// exports
module.exports.store_user = store_user
module.exports.list_users = list_users

const aws = require('aws-sdk');
const shortid = require('shortid');

const awsconfig = require('../config/awsconfig.js');

function store_user(username, cb)
{
	aws.config.update(awsconfig.aws_remote_config);
  const docClient = new aws.DynamoDB.DocumentClient();
	let uniqueid = shortid.generate();

  const params = {
    TableName : awsconfig.aws_table_name,
    Item: {
      "username" : username,
      "_id" : uniqueid
    }
  };

  docClient.put(params, function(err,data) {		
    if(err)
    {
			cb(err);
    }
    else{
			cb(null, { "username" : username, "_id" : uniqueid });
    }
  });
}

function list_users(cb)
{
	aws.config.update(awsconfig.aws_remote_config);
	const docClient = new aws.DynamoDB.DocumentClient();

  const params = {
    TableName : awsconfig.aws_table_name
  };	

	docClient.scan(params, function(err,data) {
    if(err)
    {
			cb(err);
    }
    else{
			cb(null, data["Items"]);
    }
	});
}