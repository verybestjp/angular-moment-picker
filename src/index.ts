declare var angular: any;
import Provider from './provider';
import Directive from './directive';

angular
	.module('moment-picker', [])
	.provider('momentPicker', [() => new Provider()])
	.directive('momentPicker', [
		'$timeout', '$sce', '$log', '$window', 'momentPicker', '$compile', '$templateCache', 'FrontConfig',
		($timeout: ng.ITimeoutService, $sce: ng.ISCEService, $log: ng.ILogService, $window: ng.IWindowService, momentPicker: Provider,
		$compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService, FrontConfig: any) => {
			return new Directive($timeout, $sce, $log, $window, momentPicker, $compile, $templateCache, FrontConfig);
		}
	]);

export { Provider, Directive };
