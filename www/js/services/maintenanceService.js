app.service('addIssueService',function($q,$rootScope){



var localmaintenancedb=new PouchDB("maintenancedb");


this.addIssue = function(jsonDocument) {

  var deferred = $q.defer();
  if (!jsonDocument._id) {


    localmaintenancedb.post(jsonDocument).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
  } else {
    localmaintenancedb.put(jsonDocument).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
  }
  return deferred.promise;
}


this.startListeningAddIssue = function() {
    changeListener = localmaintenancedb.changes({
      live: true,
      include_docs: true
    }).on("change", function(change) {
      if (!change.deleted) {
        $rootScope.$broadcast("addIssueService:change", change);
      } else {
        $rootScope.$broadcast("addIssueService:delete", change);
      }
    });
  }



this.destroy=function(){
  return  localmaintenancedb.destroy();
}


this.get=function(id){

  return localmaintenancedb.get(id);
}

})
