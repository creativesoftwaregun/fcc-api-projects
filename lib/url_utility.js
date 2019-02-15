// exports
module.exports.get_shortened_url = get_shortened_url
module.exports.get_url_by_id = get_url_by_id

const dns = require('dns');
const url2 = require('url');
const validate= require('validate.js');

function get_shortened_url(session, url, cb)
{
  check_url(url, (err) => {
    if(err)
    {
      cb(err);
    }
    else
    {
      store_url(session, url, (err, response) =>  {
        console.log('store_url completed');
        cb(null,response);
      });           
    }
  });
};

function check_url(url, cb) // validate uri and check if host is active
{
  var v = validate({ website: url}, { website: { url: true}} );
	if(v!=undefined)
	{
    console.log('validate: ' + v.website);
		cb(new Error('invalid uri'));
	}
  else{
    
    var host = new url2.URL(url).host;
    console.log('host:' +host );
    dns.lookup(host, (err, address, family) => {
        if(!err)
        {
          cb(null);
        }
        else{
          cb(new Error('cannot reach host'));
        }
    });
    
  }
}
 

function store_url(session,url, cb)
{
	if(!session.url_list)
	{
		session.url_list = [];
	}
	session.url_list.push([url, session.url_list.length == 0 ? 1 
                : session.url_list.length + 1]);
	
	cb(null, session.url_list.length);
}

function get_url_by_id(session, id, cb)
{
	var found = session.url_list.find(function(elem) {
		return elem[1] == id;
	});
  
  if(!found)
  {
    cb(new Error('id not found'));
  }
  else{
    
    cb(null, found[0]);
  }
  	
}