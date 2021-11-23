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

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'items', component: ItemComponent,
        children: [
          { path: 'add-item', component: AddItemsComponent },
          { path: 'edit-item', component: EditItemsComponent },
          { path: 'view-items', component: ViewItemsComponent },
          { path: 'categories', component: CategoriesComponent },
          { path: 'sub-categories', component: SubCategoriesComponent },
          { path: '', redirectTo: 'view-items', pathMatch: 'full' },
        ]
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'place-orders', component: PlaceOrderComponent },
      { path: 'price-management', component: PriceManagementComponent },
      { path: 'center-details', component: CenterDetailComponent },
      { path: 'users', component: UsersComponent },
      { path: 'vehicle', component: VehicleComponent },
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
