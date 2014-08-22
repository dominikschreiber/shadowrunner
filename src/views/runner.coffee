angular.module 'runner', [
  'ng'
  'ngStorage'
]

.config ($routeProvider) ->
  $routeProvider.when '/r/:id', {
    controller: 'RunnerCtrl',
    templateUrl: 'partials/runner.html'
  }

.controller 'RunnerCtrl', (meta, $scope, $routeParams, $localStorage) ->
  $scope.$storage = $localStorage;
  $scope.id = $routeParams.id;
  
  # update page title accordingly
  $scope.$watch(
    () -> $scope.$storage[$scope.id].personal_data.alias,
    (name) -> meta.setTitlePrefix name
  )