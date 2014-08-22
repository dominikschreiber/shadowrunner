angular.module 'landingPage', [
  'metaService'
  'boxDirective'
  'ng'
  'ngRoute'
  'ngStorage'
]

.config ($routeProvider) ->
  $routeProvider.when '/', {
    controller: 'LandingPageCtrl'
    templateUrl: 'partials/landingPage.html'
  }

.controller 'LandingPageCtrl', (meta, $scope, $localStorage, $log) ->
  $scope.$storage = $localStorage
  $scope.runners = _.omit($scope.$storage, '$default', '$reset')