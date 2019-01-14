import {Component, Inject, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractFormControl} from './controls/abstract-form-control';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractEntity, NgmBaseService} from 'ngm-base';
import {getDynamicFormControl} from './types';
import {NgmFormControlService} from './ngm-form-control.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment_ from 'jalali-moment';

const jMoment = moment_;

export interface FormModalData<Entity> {
    title: string;
    entity: any;
    defaultEntity?: Entity;
    defaultFormControl?: Map<String, AbstractFormControl<Entity>>;
}

@Component({
    providers: [NgmFormControlService],
    selector: 'ngm-modal-form',
    template: `
        <div [dir]="this.baseService.dir">
            <div style="height: 4rem;" fxLayout="row" fxLayoutAlign="space-between top">
                <h1 style="margin: 0" mat-dialog-title>{{data.title | translate}}</h1>
                <a style="cursor:pointer;" (click)="dialogRef.close()"><i class="fa fa-close"></i></a>
            </div>
            <div>
                <ng-container *ngIf="entity">
                    <form [formGroup]="form" class="form-horizontal">
                        <div *ngFor="let c of this.controls">
                            <ngm-dynamic-form-control [control]="c" [form]="form"></ngm-dynamic-form-control>
                        </div>
                    </form>
                </ng-container>
            </div>
        </div>
        <div style="margin-top: 2rem">
            <button mat-raised-button color="primary" (click)="submit()" [disabled]="!form.valid">{{'button.save' | translate}}</button>
        </div>
    `,
    styles: [
            `.cdk-overlay-pane {
            max-width: 100vw !important;
        }`
    ],
    encapsulation: ViewEncapsulation.None
})
export class NgmDynamicModalFormComponent<Entity extends AbstractEntity> implements OnInit {

    @Input()
    entity: Entity;
    controls = [];
    form: FormGroup;
    defaultEntity: Entity;

    constructor(@Inject(MAT_DIALOG_DATA) public data: FormModalData<Entity>, public translate: TranslateService, private injector: Injector,
                private formControlService: NgmFormControlService, public dialogRef: MatDialogRef<NgmDynamicModalFormComponent<Entity>>,
                public baseService: NgmBaseService) {
        this.entity = this.data.entity;
        this.defaultEntity = this.data.defaultEntity;
    }

    ngOnInit(): void {
        this.controls = this.createFrom();
        this.form = this.formControlService.toFormGroup(this.controls);
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.controls);
        }
    }

    createFrom() {
        const formModel: AbstractFormControl<any>[] = [];
        const me = this;
        Object.keys(this.entity).forEach(function (value, index, array) {
            const control: AbstractFormControl<any> = (me.data.defaultFormControl && me.data.defaultFormControl.has(value)) ?
                me.data.defaultFormControl.get(value) : getDynamicFormControl(me.entity, value);
            if (control !== undefined && control.controlType !== undefined) {
                control.value = (me.defaultEntity && me.defaultEntity[value]) ? me.defaultEntity[value] : me.entity[value];
                control.key = value;
                me.translate.stream('entity.' + me.entity._name + '.' + value).subscribe(res => {
                    control.label = res;
                    control.placeholder = res;
                });
                if (control.dataService) {
                    control.fillData(me.injector.get(control.dataService.service));
                }
                if (control.controlType === 'date-time') {
                    control.value = jMoment(control.value, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('YYYY-MM-DD HH:mm:ss');
                }
                if (control.bind) {
                    formModel.forEach(c => {
                        if (c.key === control.bind.field) {
                            c.change.push(function (event, form, con) {
                                control.dataService = control.bind.fn(con.value);
                                control.fillData(me.injector.get(control.dataService.service));
                            });
                            return;
                        }
                    });
                }
                formModel.push(control);
            }
        });
        return formModel;
    }
}
