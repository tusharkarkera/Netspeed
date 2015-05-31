var http = require('http');

var date_now = Date.now();

var options = {
	host : process.argv[2],
	port : Number(process.argv[3]),
	path : '/speedTest?str=qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop&datetime='+date_now,
	method : 'GET'
};

var req = http.request(options,function(res){
	
	res.on('data',function(d){
		
		d = JSON.parse(d);
		
		var date_now = Date.now();
	
		var date_diff = (Number(date_now) - Number(d.datetime)) / 1000;
		if(date_diff ===0){
		
			date_diff = 1;
		}
		var download_speed = (d.data_length/date_diff)*1000;
		console.log("\nDownload Speed : "+download_speed.toFixed(2) + " bps");
		console.log("Upload Speed   : "+d.upload_speed.toFixed(2) + " bps\n");
		
	});
});

req.end();
req.on('error',function(e){
	console.log("error");
	console.log(e);
});