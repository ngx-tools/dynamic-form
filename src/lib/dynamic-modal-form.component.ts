import {Component, Inject, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractEntity} from '../../entity/abstract-entity';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AbstractFormControl} from './controls/abstract-form-control';
import {FormControlService} from './form-control.service';
import {getDynamicFormControl} from './dynamic-form';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LayoutModalComponent} from '../../pages/home/layout-modal/layout-modal.component';
import {BaseComponent} from '../../base.component';
import {BreakpointObserver} from '@angular/cdk/layout';

export interface DashboardModalData {
    title: string;
    entity: any;
}

@Component({
    providers: [FormControlService],
    selector: 'app-modal-form',
    template: `
        <div [dir]="this.dir">
            <div style="height: 4rem;" fxLayout="row" fxLayoutAlign="space-between top">
                <h1 style="margin: 0" mat-dialog-title>{{data.title | translate}}</h1>
                <a style="cursor:pointer;" (click)="dialogRef.close()"><i class="fa fa-close"></i></a>
            </div>
            <div>
                <ng-container *ngIf="entity">
                    <form [formGroup]="form" class="form-horizontal">
                        <div *ngFor="let c of this.controls">
                            <app-dynamic-form-control [control]="c" [form]="form"></app-dynamic-form-control>
                        </div>
                    </form>
                </ng-container>
            </div>
        </div>
        <div>
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
export class DynamicModalFormComponent<Entity extends AbstractEntity> extends BaseComponent implements OnInit {

    @Input()
    entity: Entity;
    controls = [];
    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DashboardModalData, public translate: TranslateService,
                private formControlService: FormControlService, public dialogRef: MatDialogRef<LayoutModalComponent>,
                private injector: Injector, breakpointObserver: BreakpointObserver) {
        super(translate, breakpointObserver);
        this.entity = this.data.entity;
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
            const control: AbstractFormControl<any> = getDynamicFormControl(me.entity, value);
            if (control !== undefined && control.controlType !== undefined) {
                control.value = me.entity[value];
                control.key = value;
                me.translate.stream('entity.' + me.entity._name + '.' + value).subscribe(res => {
                    control.label = res;
                    control.placeholder = res;
                });
                if (control.dataService) {
                    control.fillData(me.injector.get(control.dataService.service));
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
