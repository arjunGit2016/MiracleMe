app.controller('viewReceivedNotificationCntrl',function($scope,$rootScope,getNotificationService){



//to display recieved notification details
    $scope._id = $rootScope.data._id;
    $scope._rev = $rootScope.data._rev;
    $scope.showTitle = $rootScope.data.showTitle;
    $scope.showNotification = $rootScope.data.showNotification;
    $scope.title = $rootScope.data.title;
    $scope.message = $rootScope.data.message;

    $scope.senderName = $rootScope.data.senderName;
    //alert(JSON.stringify($rootScope.data.senderImage));
    $scope.senderImage = $rootScope.data.senderImage;

    $scope.notificationImage = $rootScope.data.notificationImage;

    $scope.date = $rootScope.data.date;
    $scope.readStatus = $rootScope.data.readStatus;




    if ($scope.readStatus) {


      }


       else {



      //  var statusurl = "https://andestandreensibeetualle:cd59de1cbacc2f8c7361dc7ae59b3c205e5715ff@0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_notifications_status";

        var doc = {
          "notificationId": $scope._id,
          "employeeName": window.localStorage['loginid'],
          "showNotification": $scope.showNotification,
          "readStatus": true
        }

        var toUpdateLocalDoc = {
          "_id": $scope._id,
          "_rev": $scope._rev,
          "showTitle": $scope.title,
          "title": $scope.title,
          "message": $scope.message,
          "senderName": $scope.senderName,
          "senderImage": $scope.senderImage,
          "date": $scope.date,
          "readStatus": true

        };
        //alert(toUpdateLocalDoc);

      //  getNotificationService.save(toUpdateLocalDoc);
        notificationRXdb.upsert($scope._id, function(toUpdateLocalDoc) {


          var toUpdateLocalDoc = {
            "_id": $scope._id,
            "showTitle": $scope.title,
            "title": $scope.title,
            "message": $scope.message,
            "senderName": $scope.senderName,
            "senderImage": $scope.senderImage,
            "date": $scope.date,
            "readStatus": true

          };

          return toUpdateLocalDoc;

        }).then(function(res) {
          console.log(JSON.stringify(res));
        })

        statusdb.post(doc).then(function(response) {



          })
          .catch(function(error) {
            console.log(error);
          })



        $rootScope.unReadCount = $rootScope.unReadCount - 1;
        if ($rootScope.unReadCount == 0) {

          $rootScope.showCount = false;
          console.log($rootScope.showCount);

        }

      }





})
