import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { SideBarComponent } from './common/side-bar/side-bar.component';
import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CustomerComponent } from './views/customer/customer.component';
import { ItemComponent } from './views/item/item.component';
import { OrdersComponent } from './views/orders/orders.component';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { ViewItemsComponent } from './views/item/view-items/view-items.component';
import { AddItemsComponent } from './views/item/add-items/add-items.component';
import { EditItemsComponent } from './views/item/edit-items/edit-items.component';
import { CategoriesComponent } from './views/item/categories/categories.component';
import { SubCategoriesComponent } from './views/item/sub-categories/sub-categories.component';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from './services/item.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';
import {PriceManagementComponent} from './views/price-management/price-management.component';
import { CenterDetailComponent } from './views/center-detail/center-detail.component';
import {UsersComponent} from './views/users/users.component';
import {VehicleComponent} from './views/vehicle/vehicle.component';
import {ToastrModule} from "ngx-toastr";
import {FarmerService} from './services/farmer/farmer.service'
import {authInterceptorProviders} from './helper/app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    AdminComponent,
    CustomerComponent,
    ItemComponent,
    OrdersComponent,
    PlaceOrderComponent,
    ViewItemsComponent,
    AddItemsComponent,
    EditItemsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    UsersComponent,
    VehicleComponent,
    PriceManagementComponent,
    CenterDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,

  ],
  providers: [
    authInterceptorProviders,
    ItemService,
    FarmerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
