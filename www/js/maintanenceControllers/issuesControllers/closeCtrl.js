app.controller("closeCtrl", function(addIssueService,$ionicLoading,$http, $cordovaGeolocation, $scope, $rootScope, $ionicModal, $ionicPopup, $ionicHistory, $location) {

addIssueService.startListeningAddIssue();


$scope.goBack = function() {
    $ionicHistory.goBack();
  }
 // $ionicLoading.show({
 //    template: '<div class="row"><div class="col col-25"><ion-spinner icon="android"></ion-spinner></div><div class="col col-75"> Retrieving Data </div></div>'
 //        })
 //      .then(function() {
 //   console.log("The loading indicator is now displayed");
 //           })
  console.log("close" + window.localStorage['emailId']);

  //$scope.Close=function(){

  //$scope.Close=function(){

  if (window.localStorage['isManager'] == "true") {
    //alert("managder");
    console.log("manager");
    var close = {
      "selector": {
        "isResolved": "true"
      },
      "fields": []
    }

  } else {

    var close = {
      "selector": {
        "isResolved": "true",
        "email": window.localStorage['emailId']
      },
      "fields": []
    }
  }
 $scope.firstsearch=function(name)
{
  if(name.firstName==""){
   document.getElementById("dfirstList").style.display = "none";
   document.getElementById("dfirstList1").style.display = "block";
  }
else{
 //alert("not null");
      if(window.localStorage['isManager']=="true"){
        console.log(window.localStorage['loginid']);
        //"https://surya474.cloudant.com/maintanence/_design/all/_search/newSearch?q=name:"+name.firstName+"*%20AND%20Is_resolved:true%20AND%20email:"+window.localStorage['loginid']
        $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/_design/issues/_search/autoSearch?q=name:"+name.firstName+"*%20AND%20Is_resolved:true")
            .then(function(response) {
             //alert("calling");

                $scope.responseData2 = response.data.rows;
             console.log(JSON.stringify($scope.responseData2))
              document.getElementById("dfirstList").style.display = "block";
              document.getElementById("dfirstList1").style.display = "none";
            })
          }else{
		  console.log(window.localStorage['loginid']);
		  $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/_design/issues/_search/autoSearch?q=name:"+name.firstName+"*%20AND%20Is_resolved:true%20AND%20email:"+window.localStorage['loginid'])
            .then(function(response) {
             //alert("calling");
                $scope.responseData2 = response.data.rows;
             console.log(JSON.stringify($scope.responseData2))
              document.getElementById("dfirstList").style.display = "block";
              document.getElementById("dfirstList1").style.display = "none";
            })
		  }
		  }

}

  $http.post("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/_find", close)
    .success(function(response) {
      //  alert(JSON.stringify(response));
      $scope.responseData = response.docs;
      //  alert("hsd");
 $ionicLoading.hide().then(function() {
         console.log("The loading indicator is now hidden");
    });
      //  alert(JSON.stringify($scope.responseData))
    }).error(function(response){
		ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
	})

  //}
  // $scope.getIssue = function(problems) {
  //   alert("in get issue");
  //   console.log("close1");
  //   if (window.localStorage['isManager'] == "true") {
  //     $location.path("/Admineditclose");
  //
  //     $rootScope.dest = problems;
  //   } else {
  //     $location.path("/viewissueclose");
  //     $rootScope.dest = problems;
  //   }
  // }
  $scope.postproblem = function() {
    $location.path("/addIssue");
  }

})
