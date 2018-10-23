import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractFormControl, DynamicFormControlHidden} from './controls/abstract-form-control';
import {FormControlService} from './form-control.service';
import {Helper} from '../helper';
import {BaseComponent} from '../../base.component';

@Component({
    selector: 'app-dynamic-form-control',
    providers: [FormControlService],
    template: `
        <div [formGroup]="form" [hidden]="shouldHide(control)" [dir]="this.dir">
            <label [attr.for]="control.key">{{control.label}}</label>
            <mat-form-field [ngSwitch]="control.controlType" appearance="outline" [hintLabel]="">
                <input *ngSwitchCase="'textbox'" matInput [formControlName]="control.key" [id]="control.key" [type]="control.type"
                       [placeholder]="control.placeholder" (change)="doChange($event, form, control)" [checked]="control.value">
                <textarea *ngSwitchCase="'textarea'" matInput [formControlName]="control.key" [id]="control.key" [rows]="control.rows"
                          [placeholder]="control.placeholder" (change)="doChange($event, form, control)"></textarea>
                <mat-select [id]="control.key" *ngSwitchCase="'select'" [formControlName]="control.key" [compareWith]="helper.equals"
                            class="form-control" (valueChange)="doChange($event, form, control)">
                    <mat-option *ngFor="let opt of control.options" [value]="opt.value">{{opt.label}}</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-error *ngIf="!isValid">* ضروری</mat-error>
        </div>`,
    styles: [`.mat-form-field {
        width: 100%;
    }`]
})
export class DynamicFormControlComponent extends BaseComponent implements OnInit {

    @Input() control: AbstractFormControl<any>;
    @Input() form: FormGroup;
    helper = Helper;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    ngOnInit(): void {
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
