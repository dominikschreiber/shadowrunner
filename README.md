ngPrototypeBoilerplate
======================

Boilerplate for quick webapp prototyping with AngularJS. The whole webapp lives in just `index.html` for making prototyping as easy as possible. If the prototype will be used in a real project moving parts into own files can be managed almost automatically. But for prototype simplicity everything is just written in one file:

* *index.html* base code -- obvious
* *css/js dependencies* (AngularJS, bootstrap) -- via cdn in `index.html`
* *modules* for AngularJS -- in just `<script>` tags in `index.html`
* *partials* for these -- using `<script type="text/ng-template">` in `index.html`

The AngularJS project structure is roughly oriented on [ngBoilerplate](http://joshdmiller.github.io/ng-boilerplate/) with the following implications:

* the base module `app` does itself merely nothing but *depend on submodules*
* these submodules (i.e. `landingPage` what is already created) configure the `$routeProvider` to when they apply and what then to do
* partials are loaded via `templateUrl` pointing to the `id` of a `ng-template` script tag

Getting Started
---------------

    $ git clone https://github.com/dominikschreiber/ngPrototypeBoilerplate.git
	$ cd ngPrototypeBoilerplate && $EDITOR index.html
	
That's it.

Moving on
---------

Create AngularJS modules for every view (= url path) you need, configure the `$routeProvider` to use the right controller and templateUrl for this view and add a dependency to the module in the `app` module.

    <script id="yourAwesomeView/yourAwesomeView.js">
    angular.module('yourAwesomeView', ['ng', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/the/awesome/', {
			controller: 'AwesomeCtrl',
			templateUrl: 'yourAwesomeView/your-awesome-view.tpl.html'
		});
	}])
	.controller('AwesomeCtrl', ['$scope', function($scope) {
		$scope.awesome = 'you';
		// do that awesome stuff here
	}]);
	</script>
	<script type="text/ng-template">
	<p>Who is awesome?</p>
	<h1>{{awesome}}</h1>
	</script>
	<script id="app/app.js">
	angular.module('app', ['yourAwesomeView', // ...])
	</script>

Also, create AngularJS modules for every directive/filter/service you need, let them do your awesome stuff inside, and add dependencies in the view modules that need them.

From Prototype to Project
-------------------------

Once you feel comfortable with your prototype you may want to use it in a more sophisticated way. I'd recommend [ngBoilerplate](http://joshdmiller.github.io/ng-boilerplate) as it has a well thought out project structure and this prototype can be altered to this structure at least semi-automatically:

* move every view (i.e. `yourAwesomeView`) to `src/app/<view>/<view>.js` and the corresponding template to `src/app/<view>/<view>.tpl.html`
* move every directive/filter/service to `src/common/<module>/<module>.js` and the template (if there is one) to `src/app/<module>/<module>.tpl.html`
* move the css styling to `src/less/main.less` (and introduce [less](http://lesscss.org/) if you need it - i'm sure you do)

License
-------

The MIT License (MIT)

Copyright (c) 2014 Dominik Schreiber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.