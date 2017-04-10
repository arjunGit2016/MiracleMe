app.service('sentNotificationService', function($http, $q, $state, $rootScope) {

var notificationsentdb = new PouchDB('notificationsentdb'); //creating local database
  // for monitoring changes in the database
  this.startListeningSentNotifications = function() {
    changeListener = notificationsentdb.changes({
      live: true,
      include_docs: true
    }).on("change", function(change) {
      if (!change.deleted) {
        $rootScope.$broadcast("sentNotificationService:change", change);
      } else {
        $rootScope.$broadcast("sentNotificationService:delete", change);
      }
    });
  }

//for saving the document
  this.save = function(jsonDocument) {

    var deferred = $q.defer();
    if (!jsonDocument._id) {
      notificationsentdb.post(jsonDocument).then(function(response) {
        deferred.resolve(response);
      }).catch(function(error) {
        deferred.reject(error);
      });
    } else {
      notificationsentdb.put(jsonDocument).then(function(response) {
        deferred.resolve(response);
      }).catch(function(error) {
        deferred.reject(error);
      });
    }
    return deferred.promise;
  }

//for deleting the document
  this.delete = function(documentId, documentRevision) {
    return notificationsentdb.remove(documentId, documentRevision);
  }

//for synching the database
  this.sync = function(remoteDatabase) {
    notificationsentdb.sync(remoteDatabase, {
      live: true,
      retry: true
    });
  }


//to destroy the database
this.destroy=function(){

return notificationsentdb.destroy();

}

//to upadate the recieved documents
  this.updateSentDocs = function() {
    var opt = {
      "selector": {
        "senderId": window.localStorage['loginid']
      },
      "fields": []

    }

    remotesentnewsdb.find(opt).then(function(response) {

        console.log(JSON.stringify(response));
        var allDocs = response;


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

        updateDocs(allDocs.docs.length, function(loop) {
            console.log("in update");
            upsert(allDocs, function(result) {
              //console.log(JSON.stringify(allDocs));
              console.log("in upsert");
              var i = loop.iteration()


              var id = allDocs.docs[i]._id;
              var rev = allDocs.docs[i]._rev;



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
              $rootScope.sendTo = allDocs.docs[i].sendTo;
              $rootScope.notificationImage = allDocs.docs[i].notifcationImage;

              $rootScope.createdDate = allDocs.docs[i].createdDate;


              var doc = {
                "_id": allDocs.docs[i]._id,
                "showTitle": allDocs.docs[i].title,
                "title": allDocs.docs[i].title,
                "message": allDocs.docs[i].message,
                "showNotification": $rootScope.showNotification,
                "senderName": allDocs.docs[i].senderName,
                "sendTo": allDocs.docs[i].sendTo,
                "senderImage": allDocs.docs[i].senderImage,
                "notificationImage": $rootScope.notificationImage,
                "createdDate": $rootScope.createdDate,

              };

              notificationsentdb.upsert(allDocs.docs[i]._id, function(doc) {

                console.log("in upsert" + JSON.stringify(doc));
                doc = {
                  "_id": doc._id,
                  "showTitle": $rootScope.showTitle,
                  "title": $rootScope.title,
                  "message": $rootScope.message,
                  "showNotification": $rootScope.showNotification,
                  "senderName": $rootScope.senderName,
                  "sendTo": $rootScope.sendTo,
                  "senderImage": $rootScope.senderImage,
                  "notificationImage": $rootScope.notificationImage,
                  "createdDate": $rootScope.createdDate,


                };


                return doc;

              }).then(function(res) {
                //$rootScope.lastdocid=res._id;
                loop.next();
                console.log(JSON.stringify(res));
              }).catch(function(err) {
                loop.next();
              })





            })
          },
          function() {



          }
        );






      })
      .catch(function(err) {
        console.log(err);
      })


  }









})
