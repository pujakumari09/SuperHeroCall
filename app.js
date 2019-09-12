var app = angular.module("myApp", ['ngRoute']);

app.controller("dailController", function($scope, $rootScope, $http, webService){

$rootScope.num = [];
$scope.thisValue = [];
$rootScope.newAlpha = [];
$rootScope.sum = [];
$scope.data1;
var getAlphas;

  $scope.getNumberAlpha = function(event){

    let space_ = event.currentTarget.innerText;
    let zero_ = event.currentTarget.innerText;
    $scope.thisValue.push(event.currentTarget.children[0].children[0].innerText);

    $scope.currentNum = $scope.thisValue.toString();

    var replacedData = $scope.currentNum;
    replacedData = replacedData.replace(/,/g , '');
    replacedData = replacedData.replace("Space", ' ');
    $scope.currentNum = replacedData;

    if(zero_ === "0" || space_ === "Space"){

    }
    else
    {
      let clickedNum = event.currentTarget.children[0].children[0].innerText;
      let clickedAlpha = event.currentTarget.children[0].children[1].innerText;
      clickedAlpha = clickedAlpha.split(" ");
      $rootScope.num.push(clickedAlpha);
    }
  }

  $scope.submitName = function (){
    let newArr = [];
    if($rootScope.num.length > 0)
    {
      for(let i =0 ; i < $rootScope.num.length; i+=2)
      {
        newArr.push($rootScope.num[i]);
        newArr.push($rootScope.num[i+1]);

        if(newArr.length === 2){
          $rootScope.newAlpha.push(newArr);
          newArr = [];
        }
      }

      for(let i = 0; i <$rootScope.newAlpha.length; i++)
      {
        for(let j = 0; j <$rootScope.newAlpha[i].length-1; j++)
        {
          for(let k = 0; k < $rootScope.newAlpha[i][j].length; k++)
          {
            $scope.data1 = getCombination($rootScope.newAlpha[i][0][k], $rootScope.newAlpha[i][1]);
          }
        }
      }

     var getWordCombo = getName($scope.data1);
     webService.callSuperHero(getWordCombo).then(function(response){
       if(response.data.messageStatus == "success"){
         alert("SuperHero Called");
         $scope.currentNum = "";
       }
     });
    }
    else{
      alert("This cannot be empty");
    }
  }

  function getName(data){
    let length = data.length;
    let halfLength = data.length/2;
    $scope.firsthalf = data.slice(0, halfLength);
    $scope.secondhalf = data.slice(halfLength, length);

    for(let i = 0 ; i < $scope.firsthalf.length; i++){
      $scope.allCombo = getCombination($scope.firsthalf[i], $scope.secondhalf);
    }
    return $scope.allCombo;
  }

  function getCombination(a, b){
    for(let i = 0; i < b.length; i++){
      $rootScope.sum.push(a+b[i]);
    }
    return $rootScope.sum;
  }

});

app.service("webService", function($http){
  this.callSuperHero = function(data){
    console.log(data);
    return $http.post("/api/callSuperHeros", data);
  }
});
