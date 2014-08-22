angular.module 'boxDirective', ['ng']

.directive 'box', ($log) ->
  restrict: 'E'
  replace: true
  scope:
    title: '@'
  transclude: true
  templateUrl: 'partials/boxDirective.html'