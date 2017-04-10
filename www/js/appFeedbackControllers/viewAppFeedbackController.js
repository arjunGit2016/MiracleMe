app.controller('ViewAppFeedbackCtrl', function($scope, $http, $location, $state, $rootScope, $ionicHistory) {
  $scope.feedback = {}

  //for displaying feedback messages
  $scope.viewFeedbackMessages = function() {
    $rootScope.empImage = emptyProfileImage;
    $http.post(contextPath + "/generalServices/getEmployeeFeedBackList", {
      "Authorization": securityToken
    }).then(function(response) {
      console.log(JSON.stringify(response.data));
      $rootScope.viewFeedbacks = response.data.feedback;
    })
  }

//for searching suggestions given by a person
  $scope.feedbackSuggestionList = function() {
    $rootScope.empImage = emptyProfileImage;
    console.log($scope.feedback.SearchKey);
    $http.post(contextPath + "/generalServices/getEmployeeFeedBackListSearch", {
      "SearchKey": $scope.feedback.SearchKey,
      "Authorization": securityToken,
    }).then(function(response) {
      console.log(JSON.stringify(response.data));
      if (response.data.IsAuthenticate == true) {
        $rootScope.viewFeedbacks = response.data.feedback;
      } else {
        console.log("not authenticated service");
      }
    })
  }

//for showing individual feed back details
  $scope.showIndividualFeedback = function(feedback) {
    $state.go('menu.ViewIndividualFeddback');
    console.log("hello" + JSON.stringify(feedback));
    $rootScope.individualFeedback = feedback;
  }

})
