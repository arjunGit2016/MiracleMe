app.controller('IssuesCtrl',function( addIssueService,$ionicLoading,$scope,$http,$ionicPopup,$ionicModal, $location, $cordovaGeolocation, $cordovaToast, $cordovaCamera, $rootScope, $ionicHistory,ionicToast) {




addIssueService.startListeningAddIssue();
 $rootScope.responseData={};

localmaintenancedb.sync(maintanencedb,{
  //  live: true,
  // retry: true,
  filter: 'mydesign2/mydesign2',
  query_params: { email:window.localStorage['emailId']}
 });

  if (window.localStorage['isManager'] == "true"){

localmaintenancedb.sync(maintanencedb,{
  live: true,
  retry: true,
  filter: 'managerfilter/managerfilter',
 })

  }
  else{
    localmaintenancedb.sync(maintanencedb,{
       live: true,
      retry: true,
      filter: 'mydesign2/mydesign2',
      query_params: { email:window.localStorage['emailId']}
     });


  }

localmaintenancedb.replicate.to(maintanencedb);

$rootScope.$on("addIssueService:change", function(event, data) {

    $rootScope.responseData[data.doc._id] = data.doc;
    $rootScope.$apply();
  });

  $rootScope.$on("addIssueService:delete", function(event, data) {
    delete $rootScope.responseData[data.doc._id];
    $rootScope.$apply();
  });
console.log("hi");

  // if (window.localStorage['isManager'] == "true") {
  //   var open = {
  //     "selector": {
  //       "isResolved": "false"
  //     },
  //     "fields": []
  //   }
  //
  // } else {
  //   var open = {
  //
  //     "selector": {
  //       "isResolved": "false",
  //       "email": window.localStorage['emailId']
  //     },
  //     "fields": []
  //   }
  // }
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
        $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/_design/issues/_search/autoSearch?q=name:"+name.firstName+"*%20AND%20Is_resolved:false")
            .then(function(response) {
             //alert("calling");
                $scope.responseData1 = response.data.rows;
             console.log(JSON.stringify($scope.responseData1))
              document.getElementById("dfirstList").style.display = "block";
              document.getElementById("dfirstList1").style.display = "none";
            })
          }else{
		  console.log(window.localStorage['loginid']);
		  $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/_design/issues/_search/autoSearch?q=name:"+name.firstName+"*%20AND%20Is_resolved:false%20AND%20email:"+window.localStorage['loginid'])
            .then(function(response) {
             //alert("calling");
                $scope.responseData1 = response.data.rows;
             //alert(JSON.stringify($scope.responseData1))
              document.getElementById("dfirstList").style.display = "block";
              document.getElementById("dfirstList1").style.display = "none";
            })
		  }
		  }

}
$ionicLoading.hide().then(function() {
     console.log("The loading indicator is now hidden");
});
  /*maintanencedb.find(open).then(function(response) {
      // alert(JSON.stringify(response));
      $scope.responseData = response.docs;
	  $ionicLoading.hide().then(function() {
         console.log("The loading indicator is now hidden");
    });
    console.log(JSON.stringify($scope.responseData))
  }).catch(function(response){
		ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
	})*/
    //}


  $scope.getproblems = function(problems) {

$rootScope.dest=problems;
    if (window.localStorage['isManager'] == "true") {
      $location.path("/Adminedit");
     // $rootScope.dest = problems;

      //alert($rootScope.dest);
    } else {
      $location.path("/viewissue");

    }

  }
  $scope.getIssue = function(problems) {
    $rootScope.dest=problems;


    console.log("close1");
    if (window.localStorage['isManager'] == "true") {
      $location.path("/Admineditclose");


    } else {
      $location.path("/viewissueclose");
//$rootScope.dest = problems;
    }
  }

  $scope.postproblem=function(){
    $location.path("/addIssue");
  }
    })
