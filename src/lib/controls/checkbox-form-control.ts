import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';

interface CheckboxFormControlOptions extends AbstractFormControlOptions<number> {
}

export class CheckboxFormControl extends AbstractFormControl<number> {
    controlType = 'checkbox';

    constructor(options: CheckboxFormControlOptions = {}) {
        super(options);
        const me = this;
        this.change = options.change ? [
            function setChecked(event) {
                me.value = event.checked ? 1 : 0;
            },
            options.change
        ] : [
            function setChecked(event) {
                me.value = event.checked ? 1 : 0;
            }
        ];
    }
}
