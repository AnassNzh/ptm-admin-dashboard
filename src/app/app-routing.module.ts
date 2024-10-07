import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionManagementComponent} from './transaction-management/transaction-management.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionManagementComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
