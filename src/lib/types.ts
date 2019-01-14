import {AbstractFormControl} from './controls/abstract-form-control';
import {Const} from './const';
import 'reflect-metadata';

export function DynamicFormControl(control: AbstractFormControl<any>) {
    return Reflect.metadata(Const.dynamicFormControlMetadataKey, control);
}

export function getDynamicFormControl(target: any, propertyKey: string) {
    return Reflect.getMetadata(Const.dynamicFormControlMetadataKey, target, propertyKey);
}
