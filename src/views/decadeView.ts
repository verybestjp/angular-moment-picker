import { IView, IViewItem, IDirectiveScopeInternal, IModelController } from '../definitions';
import { IProviderOptions } from '../provider';
import { isValidMoment, showYear } from '../utility';

export default class DecadeView implements IView {
	public perLine: number = 4;
	public rows: { [index: number]: IViewItem[] } = {};

	constructor(
		private $scope: IDirectiveScopeInternal,
		private $ctrl: IModelController,
		private provider: IProviderOptions,
		private FrontConfig: FrontConfig) { }

	public render(): string {
		let year = this.$scope.view.moment.clone(),
			firstYear = Math.floor(year.year() / 10) * 10 - 1;

		this.rows = {};
		year.year(firstYear);
		for (let y = 0; y < 12; y++) {
			let index = Math.floor(y / this.perLine),
				selectable = this.$scope.limits.isSelectable(year, 'year');

			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push(<IViewItem>{
				index: year.year(),
				label: showYear(year.format(this.provider.yearsFormat), this.FrontConfig),
				year: year.year(),
				class: [
					this.$scope.keyboard && year.isSame(this.$scope.view.moment, 'year') ? 'highlighted' : '',
					!selectable || [0, 11].indexOf(y) >= 0 ? 'disabled' : isValidMoment(this.$ctrl.$modelValue) && year.isSame(this.$ctrl.$modelValue, 'year') ? 'selected' : ''
				].join(' ').trim(),
				selectable: selectable
			});
			year.add(1, 'years');
		}
		// return title
		return [showYear(year.subtract(2, 'years').format('YYYY'), this.FrontConfig), showYear(year.subtract(9, 'years').format('YYYY'), this.FrontConfig)].reverse().join(' - ');
	}

	public set(year: IViewItem): void {
		if (!year.selectable) return;
		this.$scope.view.moment.year(year.year);
		this.$scope.view.update();
		this.$scope.view.change('year');
	}
}
