var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData1 = {};
	$scope.formData2 = {};
	var kohteet = {};
	var etaisyydet = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/citys')
		.success(function(data) {
			$scope.todos = data;
			kohteet = data;
			console.log(data);
			//LISÄÄ KAUPUNGIT FUNKTIO
			
			$http.get('api/distances')
			.success(function(data2) {
			// KASITTELE ETÄISYYDET FUNKTIO, data2 tänne
		})
		.error(function(data) {
			console.log('Error: ' + data2);
		});
	})
	.error(function(data) {
		console.log('Error: ' + data)
	});

		//VANHAA KOODIA 
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData1)
			.success(function(data) {
				$scope.formData1 = {}; // clear the form so our user is ready to enter another starting location
				$scope.todos = data;
				console.log(data);
			})
			
		$http.post('/api/todos', $scope.formData2)
			.success(function(data) {
				$scope.formData2 = {}; // clear the form so our user is ready to enter another destination
				$scope.todos = data;
				console.log(data);
			})
			
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
