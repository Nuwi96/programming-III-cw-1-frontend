import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AdminComponent} from './layouts/admin/admin.component';
import {LoginComponent} from './views/login/login.component';
import {CustomerComponent} from './views/customer/customer.component';
import {ItemComponent} from './views/item/item.component';
import {OrdersComponent} from './views/orders/orders.component';
import {PlaceOrderComponent} from './views/place-order/place-order.component';
import {PriceManagementComponent} from './views/price-management/price-management.component';
import {AddItemsComponent} from './views/item/add-items/add-items.component';
import {EditItemsComponent} from './views/item/edit-items/edit-items.component';
import {ViewItemsComponent} from './views/item/view-items/view-items.component';
import {CategoriesComponent} from './views/item/categories/categories.component';
import {SubCategoriesComponent} from './views/item/sub-categories/sub-categories.component';
import {CenterDetailComponent} from './views/center-detail/center-detail.component';
import {UsersComponent} from './views/users/users.component';
import {VehicleComponent} from './views/vehicle/vehicle.component';
import {AuthGuard} from './guard/auth/auth.guard';
import {RoleGuard} from './guard/role/role.guard';
import {ConfigurationScreenComponent} from './views/configuration-screen/configuration-screen.component';
import {DailyLimitsComponent} from './views/daily-limits/daily-limits.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'paddy', component: ItemComponent,
        children: [
          { path: 'add-item', component: AddItemsComponent },
          { path: 'edit-item', component: EditItemsComponent },
          { path: 'view-items', component: ViewItemsComponent },
          { path: 'categories', component: CategoriesComponent },
          { path: 'sub-categories', component: SubCategoriesComponent },
          { path: '', redirectTo: 'view-items', pathMatch: 'full' },
        ],
        canActivate: [RoleGuard], data: {roles: ['ROLE_HEAD_OFFICE_MANAGER']}
      },
      { path: 'orders', component: OrdersComponent , canActivate: [RoleGuard], data: {roles: ['ROLE_HEAD_OFFICE_MANAGER']}},
      { path: 'place-orders', component: PlaceOrderComponent },
      { path: 'price-management', component: PriceManagementComponent },
      { path: 'center-details', component: CenterDetailComponent },
      { path: 'users', component: UsersComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'configuration-screen', component: ConfigurationScreenComponent },
      { path: 'daily-limit', component: DailyLimitsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
