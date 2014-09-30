var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};
	var kohteet = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/citys')
		.success(function(data) {
			$scope.todos = data;
			kohteet = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
		
/*
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another start location
				$scope.todos = data;
				console.log(data);
			})
				$http.post('/api/todos', $scope.formData2)
			.success(function(data) {
				$scope.formData2 = {}; // clear the form2 so our user is ready to enter another destination
				$scope.todos = data;
				console.log(data);
			})
			
					$http.post('/api/todos', $scope.etaisyys)
			.success(function(data) {
				$scope.etaisyys = {}; // clear the etaisyys so our user is ready to enter another length
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
*/

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
