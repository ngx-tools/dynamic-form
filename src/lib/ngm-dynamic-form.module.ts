import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgmBaseModule} from 'ngm-base';
import {TranslateModule} from '@ngx-translate/core';
import {NgmDynamicModalFormComponent} from './ngm-dynamic-modal-form.component';
import {DynamicFormControlComponent} from './dynamic-form-control.component';
import {NgmFormControlService} from './ngm-form-control.service';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        FlexLayoutModule,
        TranslateModule,
        NgmBaseModule,
        DpDatePickerModule,
    ],
    exports: [
        NgmDynamicModalFormComponent,
        FormsModule,
        ReactiveFormsModule,
        MatCommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        FlexLayoutModule,
        DpDatePickerModule,
    ],
    declarations: [
        NgmDynamicModalFormComponent,
        DynamicFormControlComponent,
    ],
    providers: [
        NgmFormControlService
    ],
    entryComponents: [
        NgmDynamicModalFormComponent,
        DynamicFormControlComponent,
    ]
})
export class NgmDynamicFormModule {
}
