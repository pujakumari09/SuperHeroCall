var express = require("express");
var router = express.Router();
var Promise  = require('promise');

function callHeros(obj){
  var superHeros = ['SUPERMAN', 'THOR', 'ROBIN', 'IRONMAN', 'GHOSTRIDER', 'CAPTAINAMERICA', 'FLASH', 'WOLVERINE',
   'BATMAN', 'HULK', 'BLADE', 'PHANTOM', 'SPIDERMAN', "BLACKWIDOW", "HELLBOY", "PUNISHER"];

  return new Promise(function(resolve, reject){
    if(obj.length> 0)
    {
      for(let i = 0; i < obj.length; i++)
      {
        for(let j =0; j < superHeros.length; j++)
        {
          if(obj[i] == superHeros[j])
          {
            var hero = obj[i];

          }
        }
      }
      console.log(hero);
      resolve(hero);
    }
    else {
      reject();
    }
  });
}

router.post("/callSuperHeros", function(req, res){

try {
  var requestedNames = req.body;
  var data = callHeros(requestedNames).then(function(result)
  {
    return result;
  });
  if(data.length>0)
  {
    data.messageStatus = "success";
    res.send(data);
  }

}
catch(error){
  res.end(error);
}
});

module.exports = router;
