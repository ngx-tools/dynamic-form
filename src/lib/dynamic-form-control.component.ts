import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractFormControl, DynamicFormControlHidden} from './controls/abstract-form-control';
import {Helper, NgmBaseService} from 'ngm-base';
import {NgmFormControlService} from './ngm-form-control.service';

@Component({
    selector: 'ngm-dynamic-form-control',
    providers: [NgmFormControlService],
    template: `
        <div [formGroup]="form" [hidden]="shouldHide(control)" [dir]="this.baseService.dir">
            <label [attr.for]="control.key">{{control.label}}</label>
            <div [ngSwitch]="control.controlType">
                <mat-form-field *ngSwitchCase="'textbox'" appearance="outline" [hintLabel]="">
                    <input matInput [formControlName]="control.key" [id]="control.key" [type]="control.type"
                           [placeholder]="control.placeholder" (change)="doChange($event, form, control)" [checked]="control.value">
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'textarea'" appearance="outline" [hintLabel]="">
                    <textarea matInput [formControlName]="control.key" [id]="control.key" [rows]="control.rows"
                              [placeholder]="control.placeholder" (change)="doChange($event, form, control)"></textarea>
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'select'" appearance="outline" [hintLabel]="">
                    <mat-select [id]="control.key" [formControlName]="control.key" [compareWith]="helper.equals"
                                class="form-control" (valueChange)="doChange($event, form, control)">
                        <mat-option *ngFor="let opt of control.options" [value]="opt.value">{{opt.label}}</mat-option>
                    </mat-select>
                </mat-form-field>
                <input *ngSwitchCase="'file'" style="display: block;" [formControlName]="control.key" [id]="control.key" [type]="'file'"
                       [placeholder]="control.placeholder" (change)="doChange($event, form, control)">
                <mat-checkbox *ngSwitchCase="'checkbox'" style="display: block;" [formControlName]="control.key" [id]="control.key"
                           (change)="doChange($event, form, control)"></mat-checkbox>
                <mat-form-field *ngSwitchCase="'date-time'" appearance="outline" [hintLabel]="">
                    <input dir="ltr" matInput [placeholder]="control.placeholder" (onChange)="doChange($event, form, control)"
                           [formControlName]="control.key" [dpDayPicker]="control.datePickerConfig" [mode]="control.mode"
                           theme="dp-material" [id]="control.key">
                </mat-form-field>
            </div>
            <mat-error *ngIf="!control.disabled && !isValid">* ضروری</mat-error>
        </div>
    `,
    styles: [`.mat-form-field {
        width: 100%;
    }

    .dp-time-select-controls {
        direction: ltr;
    }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DynamicFormControlComponent {

    @Input() control: AbstractFormControl<any>;
    @Input() form: FormGroup;
    helper = Helper;

    constructor(public baseService: NgmBaseService) {}

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    shouldHide(control: AbstractFormControl<any>) {
        if (control.hide) {
            if (typeof control.hide === 'boolean') {
                return control.hide;
            } else {
                const when = (<DynamicFormControlHidden>control.hide).when;
                return Helper.equals(this.form.get(when.field).value, when.value);
            }
        }
        return false;
    }

    doChange(event, form, control) {
        control.change.forEach(fn => fn(event, form, control));
    }
}
