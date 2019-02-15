// exports
module.exports.get_current_date_in_utc = get_current_date_in_utc
module.exports.check_date = check_date

const moment= require('moment');

function get_current_date_in_utc(cb)
{
  cb(null, moment.utc().format("YYYY-MM-DD"));
}

function check_date(date_string, cb)
{
  if(isNaN(Number(date_string))) // string value
  {
    var date_val = moment(date_string, "YYYY-MM-DD");
    if(date_val !== null)
    {
      cb(null, { unix: new Date(date_val).getTime(), utc: new Date(date_val).toUTCString() })
    }
    else
    {
      cb(null, { error: "Invalid Date"})
    }      
  
  } 
  else{ // numeric 
    var date_from_unixtime= moment(Number(date_string));
    
    if(date_from_unixtime!=null)
    {
      cb(null,  { unix: new Date(date_from_unixtime).getTime(), utc: new Date(date_from_unixtime).toUTCString()  });
    }
    else
    {
      cb(null, { error: "Invalid Date"})
    }      

  }

}

