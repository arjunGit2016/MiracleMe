app.controller('AppFeedBackCtrl', function($scope, $state, $http, ionicToast) {
  $scope.feedback = {};

  //for sending  feed back
  $scope.sendFeedBack = function() {

    if(!$scope.feedback.appFeedback)
    {
      console.log($scope.feedback.appFeedback);
      ionicToast.show('Please enter your feed back', 'bottom', false, 1500);
    }
    else {
      console.log($scope.feedback.appFeedback);
      $http.post(contextPath+"/generalServices/addEmployeeFeedBack",{
    "EmpId":window.localStorage['employeeId'],
     "Message":$scope.feedback.appFeedback,
    "Authorization":securityToken
  }).then(function(response)
{

console.log(JSON.stringify(response));
if(response.data.IsAuthenticate==true)
{
  console.log(response.data.Result);
  if(response.data.Result=="Success")
  {
    console.log("feedback added Success fully");
$scope.feedback = {};
    ionicToast.show('Feedback added succesfully', 'bottom', false, 1500);
    $state.go('menu.EmployeeNewsFeed');
  }
  else {
    console.log("sryyyyyyy");
  }
}
else {
  console.log("not authenticated service");
}
})
    }
  }
})
