app.controller('EmployeeSearchCtrl', function($state, $location, $scope, $rootScope, $http, $ionicPopup,ionicToast) {
  $scope.employeeName={};
  // for getting the employee suggestion list based on the characters entered in the search box
  $scope.employeeSuggestionList = function() {
    console.log($scope.employeeName);
    $scope.employeeSuggestionListArray = {};
    if ($scope.employeeName.searchKey.length>0) {
      $http.post(contextPath + "/generalServices/getEmployeeSuggestionList", {
        "SearchKey": $scope.employeeName.searchKey,
        "Authorization": securityToken
      }).then(function(response) {
        console.log(JSON.stringify(response));
        if (JSON.stringify(response.data.IsAuthenticate) == "true") {
          console.log("emp suggestionlist authenticated service");
          if (JSON.stringify(response.data.isDataExisted) == "true") {
            $scope.employeeSuggestionListArray = response.data.employees;
          } else if (JSON.stringify(response.data.isDataExisted) == "false") {
            ionicToast.show('No employee found', 'middle', false, 1500);
          }
        } else {
          console.log("emp suggestionlist not authenticated service");
        }
      })
    } else {
      $scope.employeeSuggestionListArray = {};
    }


  }

  $rootScope.skills=[];
  //for getting the individual employee details from the suggestion list
    $scope.employeeDetails = function(employeename) {
      $rootScope.skills=[];
     $rootScope.employeeDetails = employeename;
     console.log(JSON.stringify($rootScope.employeeDetails));
     var SkillSet = employeename.SkillSet.trim();
     console.log(SkillSet);
     var splitskills=SkillSet.split(',');
     console.log(splitskills + ""+splitskills.length);
     if(splitskills=="" || splitskills.indexOf('-') != -1){
       console.log(" no skills");
     }
     else{
     for(i=0;i<splitskills.length;i++)
     {
       $rootScope.skills.push(splitskills[i]);
       console.log($rootScope.skills);
     }
     }
     //$rootScope.skills = SkillSet.split(',');
     if ($rootScope.employeeDetails.Location == 'Miracle Heights' || $rootScope.employeeDetails.Location == 'Miracle City') {
       $rootScope.countryCode = "91-";
     } else {
       $rootScope.countryCode = "001-";
     }
     //console.log($rootScope.skills.length);
  $rootScope.aliasLength=$rootScope.employeeDetails.AliasName.trim().length;
     $location.path('/menu/EmployeeDetails');
   }


  })
