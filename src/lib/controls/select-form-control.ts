import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';
import {Helper} from '../../helper';
import {FormGroup} from '@angular/forms';

interface SelectOption {
    label: string;
    value: any;
}

interface SelectFormControlOptions extends AbstractFormControlOptions<any> {
    options?: SelectOption[];
}

export class SelectFormControl extends AbstractFormControl<any> {
    controlType = 'select';
    options: SelectOption[] = [];

    constructor(options: SelectFormControlOptions = {}) {
        super(options);
        this.options = options.options || [];
        const me = this;
        this.change = options.change ? [options.change] : [function (value, form: FormGroup) {
            me.value = value;
        }];
    }

    fillData(service) {
        const me = this;
        if (me.dataService) {
            service.index(me.dataService.params).subscribe(val => {
                const entities = Helper.convertToEntities(val.data, me.dataService.entity);
                me.options = [];
                entities.forEach((entity) => {
                    me.options.push({value: entity, label: entity.toString()});
                });
            });
        }
    }
}
