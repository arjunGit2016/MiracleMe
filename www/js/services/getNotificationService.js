app.service("getNotificationService", function($rootScope, loaderService, $state,$q) {

//for generating present time
  this.getCurrentTime = function() {

    var timestamp = new Date();
    console.log(JSON.stringify(timestamp));
    var jsondate = JSON.stringify(timestamp);
    var year = jsondate.slice(1, 5);
    var month = jsondate.slice(6, 8);
    var day = jsondate.slice(9, 11);
    var hours = jsondate.slice(12, 14);
    var minutes = jsondate.slice(15, 17);
    var seconds = jsondate.slice(18, 20);
    console.log(year + month + day + hours + minutes + seconds);
    var currentdate = year + month + day + hours + minutes + seconds;
    var datenum = Number(currentdate);
    console.log("in else present" + datenum);
    return datenum;

  }




//to monitor the database changes

  this.startListeningReceivedNotifications = function() {
    changeListenerRxdata = notificationRXdb.changes({
      live: true,
      include_docs: true
    }).on("change", function(change) {
      if (!change.deleted) {
        $rootScope.$broadcast("getNotificationService:change", change);
      } else {
        $rootScope.$broadcast("getNotificationService:delete", change);
      }
    });
  }

//to destroy the database
this.destroy=function(){

return notificationRXdb.destroy();

}


//to save the document
  this.save = function(jsonDocument) {

    var deferred = $q.defer();
    if (!jsonDocument._id) {
      notificationRXdb.post(jsonDocument).then(function(response) {
        deferred.resolve(response);
      }).catch(function(error) {
        deferred.reject(error);
      });
    } else {
      notificationRXdb.put(jsonDocument).then(function(response) {
        deferred.resolve(response);
      }).catch(function(error) {
        deferred.reject(error);
      });
    }
    return deferred.promise;
  }



//to retrieve the notifications when logging in
  this.getNews = function() {
    var newsSelector = {
      "selector": {
         "$or": [{
            "sendTo": window.localStorage['loginid']
          }, {
            "sendTo": window.localStorage['EmployeeLocation']
          }

        ]
      },
      "fields": []
    };

    var statusSelector = {
      "selector": {
        "employeeName": window.localStorage['loginid']
      },
      "fields": []

    };
    statusdb.find(statusSelector).then(function(response) {
      console.log("in status" + JSON.stringify(response));
      var notificationIds = [];

      for (var k = 0; k < response.docs.length; k++) {

        notificationIds.push(response.docs[k].notificationId);

      }




      getnews.find(newsSelector).then(function(result) {
        loaderService.hide();

        $state.go('menu.EmployeeNewsFeed');



        console.log(JSON.stringify(result));
        $rootScope.unReadCount = 0;

        var allDocs = result;
        for (var j = 0; j < allDocs.docs.length; j++) {


          $rootScope.readStatus = notificationIds.includes(allDocs.docs[j]._id);
          if (!$rootScope.readStatus) {
            $rootScope.unReadCount = $rootScope.unReadCount + 1;
            $rootScope.$apply();

          }

        }


        if ($rootScope.unReadCount == 0) {
          $rootScope.showCount = false;
          console.log("unread count state" + $rootScope.showCount);
          $rootScope.$apply();

        } else {
          $rootScope.showCount = true;

          $rootScope.$apply();
        }


        console.log($rootScope.unReadCount);






        function updateDocs(iterations, func, callback) {
          var index = 0;
          var done = false;
          var loop = {
            next: function() {
              if (done) {
                return;
              }

              if (index < iterations) {
                index++;
                func(loop);

              } else {
                done = true;
                callback();
              }
            },

            iteration: function() {
              return index - 1;
            },

            break: function() {
              done = true;
              callback();
            }
          };
          loop.next();
          return loop;
        }




        function upsert(allDocs, callback) {
          var result = allDocs;


          //   $rootScope.readStatus = notificationIds.includes(result.docs[i]._id);
          //console.log(JSON.stringify(allDocs));
          callback();
        }


        updateDocs(result.docs.length, function(loop) {
            upsert(allDocs, function(result) {
              //console.log(JSON.stringify(allDocs));
              var i = loop.iteration()
              $rootScope.readStatus = notificationIds.includes(allDocs.docs[i]._id);
              console.log($rootScope.readStatus);

              var id = allDocs.docs[i]._id;
              var rev = allDocs.docs[i]._rev;
              var showdate = allDocs.docs[i].showNotification;


              if (allDocs.docs[i].title.length > 35) {
                var showTitle = allDocs.docs[i].title;
                var showTitle = showTitle.slice(0, 30) + "....";
              } else {
                var showTitle = allDocs.docs[i].title
              }

              $rootScope.showTitle = showTitle;
              $rootScope.title = allDocs.docs[i].title;
              $rootScope.message = allDocs.docs[i].message;
              $rootScope.showNotification = allDocs.docs[i].showNotification
              $rootScope.senderName = allDocs.docs[i].senderName;
              $rootScope.senderImage = allDocs.docs[i].senderImage;
              $rootScope.notificationImage = allDocs.docs[i].notifcationImage;
              $rootScope.date = allDocs.docs[i].createdDate;


              var doc = {
                "_id": allDocs.docs[i]._id,
                "showTitle": allDocs.docs[i].title,
                "title": allDocs.docs[i].title,
                "message": allDocs.docs[i].message,
                "showNotification": $rootScope.showNotification,
                "senderName": allDocs.docs[i].senderName,
                "senderImage": allDocs.docs[i].senderImage,
                "notificationImage": $rootScope.notificationImage,
                "date": allDocs.docs[i].createdDate,
                "readStatus": $rootScope.readStatus

              };

              notificationRXdb.upsert(allDocs.docs[i]._id, function(doc) {

                // console.log("in upsert"+JSON.stringify(doc));
                $rootScope.lastdocid = doc._id;
                console.log($rootScope.readStatus);
                doc = {
                  "_id": doc._id,
                  "showTitle": $rootScope.showTitle,
                  "title": $rootScope.title,
                  "message": $rootScope.message,
                  "showNotification": $rootScope.showNotification,
                  "senderName": $rootScope.senderName,
                  "senderImage": $rootScope.senderImage,
                  "notificationImage": $rootScope.notificationImage,
                  "date": $rootScope.date,
                  "readStatus": $rootScope.readStatus

                };


                return doc;

              }).then(function(res) {
                //$rootScope.lastdocid=res._id;
                loop.next();
                console.log(JSON.stringify(res));
              }).catch(function(err) {
                loop.next();
              })




              // Okay, for cycle could continue
              //  loop.next();
            })
          },
          function() {



          }
        );




      })

      .catch(function(err) {
        loaderService.hide();

        $state.go('menu.EmployeeNewsFeed');
        console.log(err);
      })





    }).catch(function(err) {
      loaderService.hide();

      $state.go('menu.EmployeeNewsFeed');
      console.log("in particular doc" + err);


    })



  }


//to retrieve the notifications when clicked on refresh and notifications
  this.getNewsReload = function() {


    var newsSelector = {
      "selector": {
         "$or": [{
            "sendTo": window.localStorage['loginid']
          }, {
            "sendTo": window.localStorage['EmployeeLocation']
          }]
      },
      "fields": []
    };

    var statusSelector = {
      "selector": {
        "employeeName": window.localStorage['loginid']
      },
      "fields": []

    };




    statusdb.find(statusSelector).then(function(response) {


      console.log("in status" + JSON.stringify(response));
      var notificationIds = [];

      for (var k = 0; k < response.docs.length; k++) {

        notificationIds.push(response.docs[k].notificationId);

      }




      getnews.find(newsSelector).then(function(result) {
        loaderService.hide();



        console.log(JSON.stringify(result));
        $rootScope.unReadCount = 0;

        var allDocs = result;
        for (var j = 0; j < allDocs.docs.length; j++) {


          $rootScope.readStatus = notificationIds.includes(allDocs.docs[j]._id);
          if (!$rootScope.readStatus) {
            $rootScope.unReadCount = $rootScope.unReadCount + 1;
            $rootScope.$apply();

          }

        }


        if ($rootScope.unReadCount == 0) {
          $rootScope.showCount = false;
          console.log("unread count state" + $rootScope.showCount);
          $rootScope.$apply();

        } else {
          $rootScope.showCount = true;

          $rootScope.$apply();
        }


        console.log($rootScope.unReadCount);



        $rootScope.$broadcast('scroll.refreshComplete');


        function updateDocs(iterations, func, callback) {
          var index = 0;
          var done = false;
          var loop = {
            next: function() {
              if (done) {
                return;
              }

              if (index < iterations) {
                index++;
                func(loop);

              } else {
                done = true;
                callback();
              }
            },

            iteration: function() {
              return index - 1;
            },

            break: function() {
              done = true;
              callback();
            }
          };
          loop.next();
          return loop;
        }




        function upsert(allDocs, callback) {
          var result = allDocs;


          //   $rootScope.readStatus = notificationIds.includes(result.docs[i]._id);
          //console.log(JSON.stringify(allDocs));
          callback();
        }


        updateDocs(result.docs.length, function(loop) {
            upsert(allDocs, function(result) {
              //console.log(JSON.stringify(allDocs));
              var i = loop.iteration()
              $rootScope.readStatus = notificationIds.includes(allDocs.docs[i]._id);
              console.log($rootScope.readStatus);

              var id = allDocs.docs[i]._id;
              var rev = allDocs.docs[i]._rev;
              var showdate = allDocs.docs[i].showNotification;


              if (allDocs.docs[i].title.length > 35) {
                var showTitle = allDocs.docs[i].title;
                var showTitle = showTitle.slice(0, 30) + "....";
              } else {
                var showTitle = allDocs.docs[i].title
              }

              $rootScope.showTitle = showTitle;
              $rootScope.title = allDocs.docs[i].title;
              $rootScope.message = allDocs.docs[i].message;
              $rootScope.showNotification = allDocs.docs[i].showNotification
              $rootScope.senderName = allDocs.docs[i].senderName;
              $rootScope.senderImage = allDocs.docs[i].senderImage;
              $rootScope.notificationImage = allDocs.docs[i].notifcationImage;
              $rootScope.date = allDocs.docs[i].createdDate;


              var doc = {
                "_id": allDocs.docs[i]._id,
                "showTitle": allDocs.docs[i].title,
                "title": allDocs.docs[i].title,
                "message": allDocs.docs[i].message,
                "showNotification": $rootScope.showNotification,
                "senderName": allDocs.docs[i].senderName,
                "senderImage": allDocs.docs[i].senderImage,
                "notificationImage": $rootScope.notificationImage,
                "date": allDocs.docs[i].createdDate,
                "readStatus": $rootScope.readStatus

              };

              notificationRXdb.upsert(allDocs.docs[i]._id, function(doc) {

                // console.log("in upsert"+JSON.stringify(doc));
                $rootScope.lastdocid = doc._id;
                console.log($rootScope.readStatus);
                doc = {
                  "_id": doc._id,
                  "showTitle": $rootScope.showTitle,
                  "title": $rootScope.title,
                  "message": $rootScope.message,
                  "showNotification": $rootScope.showNotification,
                  "senderName": $rootScope.senderName,
                  "senderImage": $rootScope.senderImage,
                  "notificationImage": $rootScope.notificationImage,
                  "date": $rootScope.date,
                  "readStatus": $rootScope.readStatus

                };


                return doc;

              }).then(function(res) {
                //$rootScope.lastdocid=res._id;
                loop.next();
                console.log(JSON.stringify(res));
              }).catch(function(err) {
                loop.next();
              })
              // Okay, for cycle could continue
              //  loop.next();
            })
          },
          function() {
          }
        );
      })
      .catch(function(err) {

        loaderService.hide();
        console.log(err);
      })
    }).catch(function(err) {

      loaderService.hide();
      console.log("in particular doc" + err);
    })
  }
})
