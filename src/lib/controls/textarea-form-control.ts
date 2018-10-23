import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';

interface TextareaFormControlOptions extends AbstractFormControlOptions<string> {
    rows?: number;
}

export class TextareaFormControl extends AbstractFormControl<string> {
    controlType = 'textarea';
    rows: number;

    constructor(options: TextareaFormControlOptions = {}) {
        super(options);
        this.rows = options.rows || 3;
    }
}
