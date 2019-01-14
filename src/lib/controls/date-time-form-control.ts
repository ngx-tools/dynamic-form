import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';
import {FormGroup} from '@angular/forms';
import {IDatePickerConfig} from 'ng2-jalali-date-picker';

interface DateTimeFormControlOptions extends AbstractFormControlOptions<string> {
    mode?: 'day' | 'time' | 'daytime';
    config?: IDatePickerConfig;
    format?: string;
}


export class DateTimeFormControl extends AbstractFormControl<string> {
    controlType = 'date-time';
    mode: 'day' | 'time' | 'daytime';
    config: IDatePickerConfig;
    format: string;

    constructor(options: DateTimeFormControlOptions = {}) {
        super(options);
        const me = this;
        this.mode = options['mode'] || 'daytime';
        this.config = options['config'] || {};
        this.format = options['format'] || 'YYYY-MM-DD HH:mm:ss';
        this.change = options.change ? [
            function (event, form: FormGroup) {
                me.value = event.locale('en').format(me.format);
            },
            options.change
        ] : [
            function (event, form: FormGroup) {
                me.value = event.locale('en').format(me.format);
            }
        ];
    }
}
