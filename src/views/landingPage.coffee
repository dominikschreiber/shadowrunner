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
  getNewId = () ->
    (Math.random()).toString(36).slice -4
  
  meta.setTitlePrefix 'Übersicht'
  
  $scope.$storage = $localStorage
  $scope.runners = _.omit($scope.$storage, '$default', '$reset')
  
  $scope.newId = getNewId()
  while $scope.newId of $scope.runners
    $scope.newId = getNewId()
  