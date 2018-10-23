import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {DynamicModalFormComponent} from './dynamic-modal-form.component';
import {FormControlService} from './form-control.service';
import {DynamicFormControlComponent} from './dynamic-form-control.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FlexLayoutModule,
        TranslateModule,
    ],
    exports: [
        DynamicModalFormComponent,
    ],
    declarations: [
        DynamicModalFormComponent,
        DynamicFormControlComponent,
    ],
    providers: [
        FormControlService
    ],
    entryComponents: [
        DynamicModalFormComponent,
        DynamicFormControlComponent,
    ]
})
export class DynamicFormModule {
}
