angular.module 'app', [
  'metaService' 
  'landingPage' 
  'runner'
  'templates'
  'ng' 
  'ngRoute'
  'ngStorage'
]

.config ($routeProvider, $locationProvider) ->
  $routeProvider.otherwise
    redirectTo: '/'
  $locationProvider.html5Mode false
  $locationProvider.hashPrefix '!'

.controller 'MetaCtrl', (meta, $scope) ->
  $scope.$watch(
    () -> meta.title(),
    (title) -> $scope.title = title,
    true
  )
  
  meta.setTitleSuffix 'Shadowrun'