
 

var myApp = angular.module('myApp', []);

 
myApp.service('filteredListService', function ($http, $q) {

	this.dataHolder = "null";
	
    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,

        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };
 var defered = $q.defer();
	this.getAllItems=function () {
       
        $http.get('/IssueTracker/rest/Issues').success(function (success) {        	
            return defered.resolve(success);            
        }).error(function (err) {
            return defered.reject(err);
        });
        return defered.promise;
        };
        
        this.pushNewItems=function (newItems) {
            console.log(newItems);
            $http.post('/IssueTracker/rest/Issues/addIssue',newItems).success(function (success) {        	
                return defered.resolve(success);            
            }).error(function (err) {
                return defered.reject(err);
            });
            return defered.promise;
            };
    
});

//Inject Custom Service Created by us and Global service $filter. This is one way of specifying dependency Injection
var TableCtrl = myApp.controller('TableCtrl', function ($scope, $filter, filteredListService,$http) {

    $scope.pageSize = 4;
  
     var getAllItems =function () {
         var getIssues = filteredListService.getAllItems();
         getIssues.then(function (successData) {
    	$scope.allItems = successData;
    	  $scope.resetAll();
    	$scope.ItemsByPage = filteredListService.paged($scope.allItems, $scope.pageSize);
    	filteredListService.dataHolder = $scope.allItems;
    	  $scope.pagination = function () {
    	    		
    	    	$scope.filteredList = getAllItems();
    	    	console.log($scope.allItems); 
    	        $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
    	    };
    	    $scope.search = function () {
    	        $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);

    	        if ($scope.searchText == '') {
    	        	console.log( $scope.allItems.length);
    	            $scope.filteredList = $scope.allItems;
    	        }
    	     
    	    }
    	    $scope.setPage = function () {
    	        $scope.currentPage = this.n;
    	    };

    	    $scope.firstPage = function () {
    	        $scope.currentPage = 0;
    	    };

    	    $scope.lastPage = function () {
    	        $scope.currentPage = $scope.ItemsByPage.length - 1;
    	    };

    	  
    	    $scope.range = function (input, total) {
    	        var ret = [];
    	        if (!total) {
    	            total = input;
    	            input = 0;
    	        }
    	        for (var i = input; i < total; i++) {
    	            if (i != 0 && i != total - 1) {
    	                ret.push(i);
    	            }
    	        }
    	        return ret;
    	    };

    	    $scope.sort = function (sortBy) {
    	        $scope.resetAll();
    	         
    	        $scope.columnToOrder = sortBy;

    	        //$Filter - Standard Service
    	        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

    	        if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
    	        else iconName = 'glyphicon glyphicon-chevron-down';

    	        if (sortBy === 'id') {
    	            $scope.Header[0] = iconName;
    	        } else if (sortBy === 'projectTeam') {
    	            $scope.Header[1] = iconName;
    	        } else if (sortBy === 'assetName') {
    	            $scope.Header[2] = iconName;
    	        } else if (sortBy === 'assetID') {
    	            $scope.Header[3] = iconName;
    	        }
    	        else if (sortBy === 'impDate') {
    	            $scope.Header[4] = iconName;
    	        }
    	        else if (sortBy === 'issueDesc') {
    	            $scope.Header[5] = iconName;
    	        }
    	        else if (sortBy === 'classification') {
    	            $scope.Header[6] = iconName;
    	        }
    	        else if (sortBy === 'status') {
    	            $scope.Header[7] = iconName;
    	        }
    	        else if (sortBy === 'sMEs') {
    	            $scope.Header[8] = iconName;
    	        }
    	        else if (sortBy === 'serverimpacted') {
    	            $scope.Header[9] = iconName;
    	        }
    	        else if (sortBy === 'repeated') {
    	            $scope.Header[10] = iconName;
    	        }
    	        else {
    	            $scope.Header[11] = iconName;
    	        }

    	        $scope.reverse = !$scope.reverse;

    	        $scope.pagination();
    	    };

    	console.log(filteredListService.dataHolder);
    	console.log(successData);
//    	 return ("Success");
    }, function (err) {
        console.log("error in accessing the user list");
//        return ("Error");
    });
     }
    $scope.newAllItems = getAllItems();
    console.log($scope.newAllItems); 
    $scope.reverse = false;

    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.newId = '';
        $scope.newProjectName = '';
        $scope.newAssetName = '';
        $scope.newAssetID = '';
        $scope.newRepeated = '';
        $scope.newSuggestion = '';
        $scope.newImpDate = '';
        $scope.newIssueDesc = '';
        $scope.newClassification = '';
        $scope.newStatus = '';
        $scope.newSMEs = '';
        $scope.newServerImpacted = '';
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['','','','','','','','','','','',''];
    }

    $scope.add = function () {
    	 var newItems={
            id: $scope.allItems.length+1,
            projectTeam: $scope.newProjectName,
            assetName:$scope.newAssetName,
            assetID: $scope.newAssetID,
            repeated: $scope.newRepeated,
            suggestion: $scope.newSuggestion,
            impDate: $scope.newImpDate,
            issueDesc: $scope.newIssueDesc,
            classification: $scope.newClassification,
            status: $scope.newStatus,
            sMEs: $scope.newSMEs,
            serverimpacted: $scope.newServerImpacted
        
        }
    	
        $scope.allItems.push(newItems);
    	    var pushNewItems =filteredListService.pushNewItems(newItems).then(function (successData) { 
    	    	alert("successData");
    	    	}, 
    	    	function (err) {
    	    		alert("error in accessing");
    	    		});
    	    $scope.resetAll();
  }
       
    

   

    // Calculate Total Number of Pages based on Search Result
  

   
    //By Default sort ny Name


});

function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return ( item.Id == toSearch || item.impDate.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.projectTeam.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.assetName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.repeated.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.suggestion.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.assetID.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(toSearch.toLowerCase()) > -1  || item.serverimpacted.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.classification.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ) ? true : false;
}

/*Get Dummy Data for Example*/
function getData() {
    return [{
        Id: 12,
        ProjectTeam: 'Sanity Error',
        AssetName:'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'

    }, {
        Id: 42,
        ProjectTeam: 'User Error',
        AssetName: 'Success',
        AssetID: 'Manoj, Muthu',
        Repeated: 'No',
        Suggestion: 'Check Username with String',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 882,
        ProjectTeam: 'Password Error',
        AssetName: 'Failure',
        AssetID: 'Mohit',
        Repeated: 'yes',
        Suggestion: 'Check Password with String',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 672,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission'
    }, {
        Id: 987,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 62,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 672,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 456,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 245,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 452,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 45,
        ProjectTeam: 'Sanity Error',
        AssetName: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }, {
        Id: 223,
        ProjectTeam: 'Sanity Error',
        Status: 'Failure',
        AssetID: 'Manoj, Cesar, Mohit',
        Repeated: 'No',
        Suggestion: 'Sanity test the permission',
        ImplementationDate: 'lorem Ipsum',
        IssueDescription: 'lorem Ipsum',
        Classification: 'lorem Ipsum',
        Status: 'lorem Ipsum',
        SMEs: 'lorem Ipsum',
        Serverimpacted: 'lorem Ipsum'
    }];
}