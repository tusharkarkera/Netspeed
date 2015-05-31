var express = require('express');

var app = express();


app.get('/speedTest',function(req,res){
	
	var date_now = Date.now();
	
	var strLength = getByteLen(req.toString());
	var bits = strLength*8;
	
	var date_diff = (Number(date_now) - Number(req.query.datetime)) /1000;
	
	if(date_diff ===0){
		date_diff = 1;
	}
	var upload_speed = (bits/date_diff)*1000;
	res.json({'upload_speed' : upload_speed,'datetime' : Date.now(),'data_length':bits});
});

function getByteLen(normal_val) {
    // Force string type
    normal_val = String(normal_val);

    var byteLen = 0;
    for (var i = 0; i < normal_val.length; i++) {
        var c = normal_val.charCodeAt(i);
        byteLen += c < (1 <<  7) ? 1 :
                   c < (1 << 11) ? 2 :
                   c < (1 << 16) ? 3 :
                   c < (1 << 21) ? 4 :
                   c < (1 << 26) ? 5 :
                   c < (1 << 31) ? 6 : Number.NaN;
    }
    return byteLen;
}


app.listen(3000, function() {
	console.log("Server Started ... ");
});