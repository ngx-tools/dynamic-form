import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AbstractFormControl} from './controls/abstract-form-control';

@Injectable()
export class NgmFormControlService {
    toFormGroup(controls: AbstractFormControl<any>[]) {
        const group: any = {};

        controls.forEach(control => {
            group[control.key] = new FormControl({value: control.value || '', disabled: control.disabled}, control.validators);
        });
        return new FormGroup(group);
    }
}
