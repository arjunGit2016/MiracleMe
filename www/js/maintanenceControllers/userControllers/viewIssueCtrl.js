app.controller("ViewIssueCtrl", function(addIssueService,$http, $scope, $ionicSlideBoxDelegate, $rootScope, $ionicPopup, $cordovaToast, $ionicScrollDelegate, $ionicHistory, $location, ionicToast, $ionicLoading,$state) {
  $scope.back = function() {
    $ionicHistory.goBack();
  }

 var data = $rootScope.dest;


  $rootScope.comment1 = [];

  var jsonData = {};
    $rootScope.user = data.title;
    console.log(data._id);
    $rootScope.id = data._id;
    $rootScope.rev = data._rev;
    $rootScope.des = data.description;
    $rootScope.lat = data.location;
    $rootScope.address = data.addressLine;
    $rootScope.city = data.city;
    $rootScope.state = data.state;
    $rootScope.country = data.country;
    $rootScope.worklocation = data.workingLocation;
    $rootScope.img = data.issueImage;
    $rootScope.isChecked = data.isResolved;
    $rootScope.date = data.createdDate;
    $rootScope.subdate = data.submittedDate;
    $rootScope.Poke = data.poke;
    $rootScope.myWelcome = data.comment;
    $rootScope.status = data.status;
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
      "_id": data._id,
      "_rev": data._rev,
      "title": data.title,
      "description": data.description,
      "issueImage": data.issueImage,
      "location": data.location,
      "addressLine": data.addressLine,
      "city": data.city,
      "state": data.state,
      "country": data.country,
      "workingLocation": data.workingLocation,
      "createdDate": new Date(),
      "submittedDate": data.submittedDate,
      "isResolved": data.isResolved,
      "email": window.localStorage['emailId'],
      "comment": $rootScope.comment1,
	  "status":data.status,
	  "poke":data.poke
    }

  $scope.solve = function(isChecked) {
    //  alert(isChecked);
    $rootScope.isChecked = isChecked;
  }
  $scope.sendMessage = function(name) {
      $scope.getID = $rootScope.id;
      //  alert($scope.getID);


     addIssueService.get($rootScope.id).then(function(response){


       $rootScope.revid = data._rev;
       $scope.image = $rootScope.img;
       $ionicSlideBoxDelegate.update();
       $rootScope.myWelcome = data.Comment;
       var msgdata = {
         "_id": $scope.getID,
         "_rev": $rootScope.revid,
         "title": $scope.user,
         "description": $scope.des,
         "issueImage": $scope.image,
         "addressLine": $rootScope.address,
         "city": $rootScope.city,
         "state": $rootScope.state,
         "country": $rootScope.country,
         "workingLocation": $rootScope.worklocation,
         "createdDate": new Date(),
         "submittedDate": $rootScope.subdate,
         "location": $rootScope.lat,
         //"Date": $rootScope.date,
         "isResolved": $rootScope.isChecked,
         "email": window.localStorage['emailId'],
         "comment": $rootScope.comment1,
       "status":$rootScope.status,
       "poke":$rootScope.Poke

       }
       if (name.txtcomment != '') {
         $rootScope.comment1.push({
           "id": window.localStorage['emailId'],
           "date": new Date(),
           "comment": name.txtcomment,
           "pic": window.localStorage['Image']
         });
      msgdata['comment']=$rootScope.comment1;

         addIssueService.addIssue(msgdata).then(function(response){

           $scope.responseData = response;
      name.txtcomment = "";
         })
         .catch(function(err){
      ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);

         })


       }
        else {
         console.log("no commmets");
       }

     })
     .catch(function(err){

       console.log("got some error");
     })


    }
    //Send Notification to Admin
  $scope.saveDoc = function() {
    var notificatonssentdb = "https://miracle-me:Surya@474@miracle-me.cloudant.com/issuedb";
    var postdb = new PouchDB(notificatonssentdb, auth);
    var jsonDocument = {
      "id": $rootScope.dest,
      "title": $rootScope.user,
      "description": $rootScope.des,
      "employee": window.localStorage['uname'],
      "Email": window.localStorage['emailId']
    }
    postdb.post(jsonDocument).then(function(response) {
      //loaderService.hide();
      allTokens = [];
      console.log(JSON.stringify(response));
    })
  }
  $scope.poke = function() {
    $http.post(contextPath + '/generalServices/getEmployeePushToken', {
      "LoginId": 'sganta1',
      "Authorization": securityToken
    }).then(function(response) {

      var req={

          method: "POST",
                dataType: 'jsonp',
                headers: {'Content-Type': 'application/json', 'Authorization': 'key=AAAA2EWNEro:APA91bHLsXJt1T4frL-eTqLlstyQ2_vA8bTJyOiVvmbitWoJl35DaWYm_zwEw7P91LPJ-aGQrhdTa54rSVRvWSY_uLGfE19rVB3cnNHhp6wMwhrdt1ZnLKT9E08aMMiBV23U90cb3hzT'},
                url: "https://fcm.googleapis.com/fcm/send",
                data: JSON.stringify(
                    {
                      "notification":{
                        "title":$rootScope.user,  //Any value
                        "message":$rootScope.des,  //Any value
                        "sound": "default", //If you want notification sound
                        "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
                        "icon": "www/img/MiracleMeLogo.png"  //White icon Android resource
                      },
                      "data":{
                        "title":$rootScope.user,
                        "message":$rootScope.des,
                          "click_action": "FCM_PLUGIN_ACTIVITY"
                      //  "param1":,  //Any data to be retrieved in the notification callback
                      //  "param2":
                      },
                      "to":data.PushToken, //Topic or single device
                      "priority":"high", //If not set, notification won't be delivered on completely closed iOS app

        })

}

      $http(req).then(function(response) {
        //loaderService.hide();
        if (data.success == 1) {
          $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/" + $scope.data).success(function(response) {
            jsonData = {
              "_id": response._id,
              "_rev": response._rev,
              "title": response.title,
              "description": response.description,
              "issueImage": response.issueImage,
              "location": response.location,
              "addressLine": response.addressLine,
              "city": response.city,
              "state": response.state,
              "country": response.country,
              "workingLocation": response.workingLocation,
              "createdDate": new Date(),
              "submittedDate": response.submittedDate,
              "isResolved": response.isResolved,
              "email": window.localStorage['emailId'],
              "comment": response.comment,
              "status": response.status
            };

            jsonData["poke"] = true;
            $rootScope.Poke = true;
            $http.post("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues", jsonData)
              .success(function(response) {
                $scope.responseData = response;
                console.log("cancelled");
              })
          }).error(function(response) {
            console.log("conflicts");
			ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
          })
          $scope.saveDoc();
          // notificationService.resetValues(name);
          // alert("successfully sent the notification console.log("successfully sent the notification"); } })
        }
        console.log("poked");
      })
    })
  }

  $scope.cancle = function() {
var jsonData={
        "_id": data._id,
        "_rev": data._rev,
        "title": data.title,
        "description": data.description,
        "issueImage": data.issueImage,
        "location": data.location,
        "addressLine": data.addressLine,
        "city": data.city,
        "state": data.state,
        "country": data.country,
        "workingLocation": data.workingLocation,
        "createdDate": new Date(),
        "submittedDate": data.submittedDate,
        "isResolved": data.isResolved,
        "email": window.localStorage['emailId'],
        "comment": data.comment
      };
      jsonData["status"] = "Cancelled";
      jsonData["isResolved"] = "true";
    addIssueService.addIssue(jsonData).then(function(resp){

    $state.go('menu.tab2');

    }).catch(function(err){

      console.log("got some error");
    })
  }


  $scope.Resolve = function() {
    jsonData["isResolved"] = "true";
    jsonData["status"] = "Resolved";
addIssueService.addIssue(jsonData).then(function(resp){

  console.log("resolved");
  $state.go('menu.tab2');
})
.catch(function(err){

  console.log("not resolved "+err);
})



  }
  $scope.editDes = function() {
    $location.path("/editIssue");
  }
});
