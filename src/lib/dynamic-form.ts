import {Const} from '../const';
import {AbstractFormControl} from './controls/abstract-form-control';

export function DynamicFormControl(control: AbstractFormControl<any>) {
    return Reflect.metadata(Const.dynamicFormControlMetadataKey, control);
}

export function getDynamicFormControl(target: any, propertyKey: string) {
    return Reflect.getMetadata(Const.dynamicFormControlMetadataKey, target, propertyKey);
}
