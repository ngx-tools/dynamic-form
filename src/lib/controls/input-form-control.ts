import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';

interface InputFormControlOptions extends AbstractFormControlOptions<string> {
    type: string;
}

export class InputFormControl extends AbstractFormControl<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: InputFormControlOptions = {type: 'textbox'}) {
        super(options);
        this.type = options['type'] || '';
    }
}
