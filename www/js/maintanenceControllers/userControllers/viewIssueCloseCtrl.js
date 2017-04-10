app.controller("ViewIssueCloseCtrl", function($state,addIssueService,$http,$ionicSlideBoxDelegate, $scope, $rootScope, $ionicPopup, $cordovaToast, $ionicScrollDelegate, $ionicHistory, $location,ionicToast) {
    $scope.back = function() {
        $ionicHistory.goBack();
    }

    $scope.data = $rootScope.dest;
    $rootScope.comment1 = [];
    var jsonData = {};
   var id=$scope.data._id;

    addIssueService.get(id).then(function(response){

      console.log(response);


        $rootScope.user = response.title;
        console.log(response._id);
        $rootScope.id = response._id;
        $rootScope.rev = response._rev;
        $rootScope.des = response.description;
        $rootScope.lat = response.location;
        $rootScope.address = response.addressLine;
        $rootScope.city = response.city;
        $rootScope.state = response.state;
        $rootScope.country = response.country;
        $rootScope.worklocation = response.workingLocation;
        $rootScope.img = response.issueImage;
        $rootScope.isChecked = response.isResolved;
        $rootScope.date = response.createdDate;
        $rootScope.subdate = response.submittedDate;
        $rootScope.myWelcome = response.comment;
        $rootScope.status=response.status;
        console.log($rootScope.myWelcome);
		 console.log($rootScope.img);

     if (!($rootScope.myWelcome)) {
            $rootScope.comment1 = [];

        } else {
            //  alert($scope.myWelcome[0].comment);
            for (i = 0; i < $rootScope.myWelcome.length; i++) {
                $rootScope.comment1.push({
                    "id": $rootScope.myWelcome[i].id,
                    "comment": $rootScope.myWelcome[i].comment,
                    "date": $rootScope.myWelcome[i].date,
					"pic":window.localStorage['Image']

                });
            }
        }


        jsonData = {
            "_id": response._id,
            "_rev": response._rev,
            "title": response.title,
            "description": response.description,
            "issueImage": response.issueImage,
            "location": response.location,
            "addressLine": response.addressLine,
            "city":response.city,
            "state": response.state,
            "country":response.country,
            "workingLocation": response.workingLocation,
            "createdDate":   new Date(),
            "submittedDate":response.submittedDate,
            "isResolved": response.isResolved,
            "email": window.localStorage['emailId'],
            "comment": $rootScope.comment1
        };

        })

    $scope.solve = function(isChecked) {
        //  alert(isChecked);
        $rootScope.isChecked = isChecked;
    }
    $scope.sendMessage = function(name) {
        $scope.getID = $rootScope.id;
        //  alert($scope.getID);
        $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/" + $scope.getID).then(function(response) {
            $rootScope.revid = response.data._rev;
            $scope.image = $rootScope.img;
            $ionicSlideBoxDelegate.update();
            $rootScope.myWelcome = response.data.Comment;
            var data = {
                "_id": $scope.getID,
                "_rev": $rootScope.revid,
                "title": $scope.user,
                "description": $scope.des,
                "issueImage": $scope.image,
                "addressLine": $rootScope.address,
                "city":$rootScope.city,
                "state": $rootScope.state,
                "country":$rootScope.country,
                "workingLocation": $rootScope.worklocation,
                "createdDate":   new Date(),
                "submittedDate":$rootScope.subdate,
                "location": $rootScope.lat,
                //"Date": $rootScope.date,
                "isResolved": $rootScope.isChecked,
                "email": window.localStorage['emailId'],
                "comment": $rootScope.comment1
            }
            if (name.txtcomment != '') {
                $rootScope.comment1.push({
                    "id": window.localStorage['emailId'],
                    "date": new Date(),
                    "comment": name.txtcomment,
					"pic":window.localStorage['Image']
                });
                $http.post("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues", data)
                    .success(function(response) {
                        //  alert(JSON.stringify(response));
                        $scope.responseData = response;
						 name.txtcomment = "";
                        //          alert(JSON.stringify($scope.responseData))
                    }).error(function(response){
						ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
					})

            } else {
                console.log("no commmets");
            }
        });
    }
    //Send Notification to Admin
    

    $scope.Resolve = function() {
        jsonData["isResolved"] = "false";
        jsonData["status"]="Reopened";

        addIssueService.addIssue(jsonData).then(function(resp){
          $scope.responseData = resp;
          ionicToast.show('Successfully reopened the issue', 'bottom', false, 1500);
          console.log("Resolve");

          $state.go('menu.Issues');
        })
        .catch(function(err){
        ionicToast.show('Failed to reopen the issue', 'bottom', false, 1500);
          console.log("not resolved "+err);
        })

        console.log("Resolve");
    }



        $scope.editDes = function() {
        $location.path("/editIssue");
    }
});
