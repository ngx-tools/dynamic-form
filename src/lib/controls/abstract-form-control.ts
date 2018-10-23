import {FormGroup, ValidatorFn} from '@angular/forms';

export interface DynamicFormControlDataService {
    service: any;
    entity: any;
    params?: {};
}

export interface DynamicFormControlHidden {
    when: { field: string, value: string };
}

export interface AbstractFormControlOptions<T> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    placeholder?: string;
    change?: Function;
    dataService?: DynamicFormControlDataService;
    hide?: DynamicFormControlHidden | Boolean;
    validators?: ValidatorFn[];
    bind?: { field: string; fn: Function };
}

export class AbstractFormControl<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    change: Function[];
    dataService: DynamicFormControlDataService = undefined;
    hide: DynamicFormControlHidden | Boolean = undefined;
    validators: ValidatorFn[] = [];
    bind: { field: string; fn: Function } = undefined;

    constructor(options: AbstractFormControlOptions<T> = {}) {
        const me = this;
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.placeholder = options.placeholder || '';
        this.change = options.change ? [options.change] : [function (event, form: FormGroup) {
            me.value = form.value[me.key];
        }];
        this.dataService = options.dataService || undefined;
        this.hide = options.hide || undefined;
        this.validators = options.validators || [];
        this.bind = options.bind || undefined;
    }

    fillData(service) {
    }
}
