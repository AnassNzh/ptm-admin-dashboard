import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormModule} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent, NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {AuthInterceptor} from './services/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NzCardComponent} from 'ng-zorro-antd/card';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzTableComponent, NzTableModule, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzMessageComponent} from 'ng-zorro-antd/message';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import { TransactionTableComponent } from './componenets/transaction-table/transaction-table.component';
import { TransactionFormComponent } from './componenets/transaction-form/transaction-form.component';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzModalComponent, NzModalModule} from 'ng-zorro-antd/modal';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    TransactionManagementComponent,
    TransactionTableComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzButtonComponent,
    NzLayoutComponent,
    NzSiderComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzIconDirective,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    NzColDirective,
    NzCardComponent,
    NzPageHeaderComponent,
    NzTableComponent,
    NzThAddOnComponent,
    NzMessageComponent,
    NzTypographyComponent,
    NzSpinComponent,
    NzTableModule,
    NzModalComponent,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerComponent,
    NzSelectComponent,
    NzOptionComponent
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
