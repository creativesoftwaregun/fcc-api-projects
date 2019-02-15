// exports
module.exports.get_whoami_json = get_whoami_json

function get_whoami_json(req, cb)
{
  var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(':');
  var os = req.headers["user-agent"];
	var language = req.headers["accept-language"];  

	var findValidIP = function(elem) { 
		if(elem!= undefined || elem === "")
		{
			return !isNaN(elem[0]);
		}
	}

  cb(null, { "ipaddress" :  ip.find(findValidIP), "language" : language, "software" : os });
}
