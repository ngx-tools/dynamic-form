import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';
import {FormGroup} from '@angular/forms';

interface FileFormControlOptions extends AbstractFormControlOptions<string> {
}

export class FileFormControl extends AbstractFormControl<string> {
    controlType = 'file';
    type: string;

    constructor(options: FileFormControlOptions = {}) {
        super(options);
        const me = this;
        this.type = options['type'] || 'file';
        this.change = options.change ? [options.change] : [function (event, form: FormGroup) {
            me.value = event.target.files[0];
        }];
    }
}
