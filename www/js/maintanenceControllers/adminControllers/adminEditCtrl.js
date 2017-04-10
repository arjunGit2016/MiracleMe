app.controller("AdminEditCtrl", function(addIssueService,$http, $scope,$ionicSlideBoxDelegate, $rootScope, $ionicPopup, $cordovaToast, $ionicScrollDelegate, $ionicHistory, $location,ionicToast) {
    $scope.back = function() {
        $ionicHistory.goBack();
    }
    $scope.data = $rootScope.dest;
    $rootScope.comment1 = [];
    var jsonData = {};

        $rootScope.user =$scope.data.title;
        
        $rootScope.id =$scope.data._id;
        $rootScope.rev =$scope.data._rev;
        $rootScope.des =$scope.data.description;
        $rootScope.lat =$scope.data.location;
        $rootScope.address = $scope.data.addressLine;
        $rootScope.city = $scope.data.city;
        $rootScope.state =$scope.data.state;
        $rootScope.country =$scope.data.country;
        $rootScope.worklocation =$scope.data.workingLocation;
        $rootScope.img = $scope.data.issueImage;
        $rootScope.isChecked = $scope.data.isResolved;
        $rootScope.date = $scope.data.createdDate;
        $rootScope.subdate = $scope.data.submittedDate;
        $rootScope.myWelcome = $scope.data.comment;
		$rootScope.Poke=$scope.data.poke;
        $rootScope.Email=$scope.data.email;
          $rootScope.status=$scope.data.status;
        console.log($rootScope.myWelcome);
        if (!($rootScope.myWelcome)) {
            $rootScope.comment1 = [];

        } else {
            //  alert($scope.myWelcome[0].comment);
            for (i = 0; i < $rootScope.myWelcome.length; i++) {
                $rootScope.comment1.push({
                    "id": $rootScope.myWelcome[i].id,
                    "comment": $rootScope.myWelcome[i].comment,
                    "date": $rootScope.myWelcome[i].date,
                    "pic":$rootScope.myWelcome[i].pic
                });
            }
        }
        jsonData = {
            "_id": $scope.data._id,
            "_rev": $scope.data._rev,
            "title": $scope.data.title,
            "description": $scope.data.description,
            "issueImage": $scope.data.issueImage,
            "location": $scope.data.location,
            "addressLine": $scope.data.addressLine,
            "city":$scope.data.city,
            "state": $scope.data.state,
            "country":$scope.data.country,
            "workingLocation": $scope.data.workingLocation,
            "createdDate":   $scope.data.createdDate,
            "submittedDate":$scope.data.submittedDate,
            "isResolved": $scope.data.isResolved,
            "email": $scope.data.email,
            "comment": $rootScope.comment1,
            "status":$rootScope.status,
			"poke":$rootScope.Poke

        };
    

    $scope.sendMessage = function(name) {
        $scope.getID = $rootScope.id;
        //  alert($scope.getID);
addIssueService.get($rootScope.id).then(function(response){
            $rootScope.revid = $scope.data._rev;
            $scope.image = $rootScope.img;
              $ionicSlideBoxDelegate.update();
            $rootScope.myWelcome = $scope.data.Comment;
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
                "createdDate":   $rootScope.date,
                "submittedDate":$rootScope.subdate,
                "location": $rootScope.lat,
                //"Date": $rootScope.date,
                "isResolved": $rootScope.isChecked,
                "email": $rootScope.Email,
                "comment": $rootScope.comment1,
                "status":$rootScope.status,
				"poke":$rootScope.Poke

            }
            if (name.txtcomment != '') {
                $rootScope.comment1.push({
                    "id": window.localStorage['emailId'],
                    "date": new Date(),
                    "comment": name.txtcomment,
                    "pic":window.localStorage['Image']
                });
               addIssueService.addIssue(data).then(function(response){
                       
                        $scope.responseData = response;
						 name.txtcomment = "";

                    })         .catch(function(err){
      ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);

         })

            } else {
                console.log("no commmets");
            }
        }) .catch(function(err){

       console.log("got some error");
     })
    }
    //Send Notification to Admin


    $scope.Resolve = function() {
        jsonData["isResolved"] = "true";
        jsonData["status"]="Resolved";
      addIssueService.addIssue(jsonData).then(function(response){
                $scope.responseData = response;
                console.log("Resolve");
				ionicToast.show('Successfully resolved the issue', 'bottom', false, 1500);
				$location.path("/menu/tab2");
	  }).catch(function(err){
  ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
   })   
   }

});
