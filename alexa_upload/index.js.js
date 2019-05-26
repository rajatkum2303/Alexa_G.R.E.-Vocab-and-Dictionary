
exports.handler = function(event,context)  
{
  var request=event.request;
if(request.type==="LaunchRequest"){
  var options={};
  var Dictionary = require("oxford-dictionary-api");
   var x;
var app_id = "7b80bcd8"; var app_key = "6470ee68465b25872b955e70ded7228d";

var dict = new Dictionary(app_id,app_key);

dict.find("ace",function(error,data){ if(error) return console.log(error); var Data =data;
       
             var lex  = data.results[0];
             var lexent = lex["lexicalEntries"];
             var entry =(lexent[0]["entries"]);
             var def = entry[0]["senses"];
             x=def[0]["definitions"]        
             });
      


	options.speechtext="Welcome to vocab for gre skill?plese ask the  new word or greet someone?. meaning of ace is "+x,
	options.repromptext= "you can ask for a new word or greet someone. ", 
	options.endSession= false;
	
	context.succeed(buildresponce(options)); 
	
	
}else if(request.type==="IntentRequest"){

options={};
if(request.intent.name==="greet"){
name=request.intent.slots.hello_name.value;
options.speechtext="hello"+name+"  ." +"good morning "+"."+"this is vocab skill";
options.endSession=true;
context.succeed(buildresponce(options));
}else
{ context.fail("unknown intent");
}

}else if(request.type==="SessionEndedRequest"){

}else{
  context.fail("unknown intent");
}
}


 function buildresponce(options){
 	var response={
 		"version": "1.0",
 		 "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": options.speechtext   
    },
    "shouldEndSession": options.endSession
    }
};
    if(options.repromptext) {
    	response.response.reprompt ={
    		outputSpeech:{
    		 "type": "PlainText",
    	      "text": options.repromptext
      }   
    	};
    }
    return response;
  } 