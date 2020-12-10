import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CustomFormsModule } from "ng2-validation"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { AppComponent } from './app.component';
import { IconComponent } from './components/ui/icon/icon.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './screens/home/home.component';
import { BolsaComponent } from './screens/bolsa/bolsa.component';
import { CarritoComponent } from './screens/carrito/carrito.component';
import { WishListComponent } from './screens/wish-list/wish-list.component';
import { ProductoComponent } from './screens/producto/producto.component';
import { TrackingComponent } from './screens/tracking/tracking.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { ContactoComponent } from './screens/contacto/contacto.component';
import { CheckOutComponent } from './screens/check-out/check-out.component';
import { OrderSuccessComponent } from './screens/order-success/order-success.component';
import { AdminProductosComponent } from './screens/admin/admin-productos/admin-productos.component';
import { AdminOrdenesComponent } from './screens/admin/admin-ordenes/admin-ordenes.component';
import { ProductFormComponent } from './screens/admin/product-form/product-form.component';
import { OrderFormComponent } from './screens/admin/order-form/order-form.component';
import { ListaProductosComponent } from './screens/lista-productos/lista-productos.component';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { NgxPayPalModule } from 'ngx-paypal'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryMenuComponent } from "./components/category-menu/category-menu.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HeaderComponent } from './components/header/header.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { BannerComponent } from './components/banner/banner.component';

import { FooterComponent } from './components/footer/footer.component'

import {MaterialModule} from './material/material.module';
import { ProductosAleatoriosComponent } from './components/productos-aleatorios/productos-aleatorios.component';
import { StatusService } from './services/status/status.service';
import { ContactoAtencionEspecialComponent } from './components/contacto-atencion-especial/contacto-atencion-especial.component';

import { OrderService } from './services/order/order.service';
import { RegresarATiendaComponent } from './components/regresar-a-tienda/regresar-a-tienda.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';
import { TextoIntroContactoComponent } from './components/texto-intro-contacto/texto-intro-contacto.component';
import { ContactThroughofComponent } from './components/contact-throughof/contact-throughof.component';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { RoleService } from './services/role/role.service';
import { BackgroundContactoComponent } from './components/background-contacto/background-contacto.component';
import { ShoppingBagService } from './services/shopping-bag/shopping-bag.service';
import { BolsaVaciaComponent } from './components/bolsa-vacia/bolsa-vacia.component';

import {MatIconModule} from '@angular/material/icon';
import { ProductBagComponent } from './components/product-bag/product-bag.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';
import { CategoryFormComponent } from './screens/admin/category-form/category-form.component';
import { AdminCategoriesComponent } from './screens/admin/admin-categories/admin-categories.component';
import { AdminPaymentsComponent } from './screens/admin/admin-payments/admin-payments.component';
import { PaymentFormComponent } from './screens/admin/payment-form/payment-form.component';
import { ProductBagListComponent } from './components/product-bag-list/product-bag-list.component';
import { WishlistProductsComponent } from './components/wishlist-products/wishlist-products.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { AddressFormComponent} from './components/address-form/address-form.component';

import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { ProductCartListComponent } from './components/product-cart-list/product-cart-list.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { AdminRetirosComponent } from './screens/admin/admin-retiros/admin-retiros.component';
import { RetiroService } from './services/retiro/retiro.service';
import { RetirosFormComponent } from './screens/admin/retiros-form/retiros-form.component';
import { CustomerTrackingListComponent } from './screens/customer-tracking-list/customer-tracking-list.component';
import { TrackingFormComponent } from './components/tracking-form/tracking-form.component';

import {UserProfileFormComponent} from './components/user-profile-form/user-profile-form.component';
import { UserProfileComponent } from './screens/user-profile/user-profile.component';
import { PaypalButtonsComponent } from './components/paypal-buttons/paypal-buttons.component';

import {AuthGuard} from './services/guards/auth.guard';
import {AuthAdminGuard} from './services/guards/auth-admin.guard';
import {AuthSharedGuard} from './services/guards/auth-shared.guard';
import { FilterPriceComponent } from './components/filter-price/filter-price.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FilterNameComponent } from './components/filter-name/filter-name.component';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    HomeComponent,
    BolsaComponent,
    CarritoComponent,
    WishListComponent,
    ProductoComponent,
    TrackingComponent,
    AboutUsComponent,
    ContactoComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductosComponent,
    AdminOrdenesComponent,
    ProductFormComponent,
    OrderFormComponent,
    ListaProductosComponent,
    CategoryMenuComponent,
    ProductCardComponent,
    HeaderComponent,
    NavbarComponent,
    LogoComponent,
    BannerComponent,
    FooterComponent,
    ProductosAleatoriosComponent,
    ContactoAtencionEspecialComponent,
    RegresarATiendaComponent,
    CategoryContainerComponent,
    TextoIntroContactoComponent,
    ContactThroughofComponent,
    BackgroundContactoComponent,
    BolsaVaciaComponent,
    ProductBagComponent,
    EmptyPageComponent,
    CategoryFormComponent,
    AdminCategoriesComponent,
    AdminPaymentsComponent,
    PaymentFormComponent,
    ProductBagListComponent,
    WishlistProductsComponent,
    ProductContainerComponent,
    AddressFormComponent,
    ProductCartListComponent,
    CartCheckoutComponent,
    AdminRetirosComponent,
    RetirosFormComponent,
    CustomerTrackingListComponent,
    TrackingFormComponent,
    UserProfileFormComponent,
    UserProfileComponent,
    PaypalButtonsComponent,
    FilterPriceComponent,
    FilterNameComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'bolsa',
        component: BolsaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'carrito',
        component: CarritoComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'wishlist',
        component: WishListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        component: AboutUsComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'check-out/:id',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'producto/:productid',
        component: ProductoComponent
      },
      {
        path: 'lista-productos',
        component: ListaProductosComponent
      },
      {
        path: 'admin/productos/nuevo',
        component: ProductFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'tracking/:key',
        component: CustomerTrackingListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/productos/:id',
        component: ProductFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/productos',
        component: AdminProductosComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/ordenes/:id',
        component: OrderFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/ordenes',
        component: AdminOrdenesComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/categories/nuevo',
        component: CategoryFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/categories',
        component: AdminCategoriesComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/payments/nuevo',
        component: PaymentFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/payments/:id',
        component: PaymentFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/payments',
        component: AdminPaymentsComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/retiros/nuevo',
        component: RetirosFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/retiros/:id',
        component: RetirosFormComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'admin/retiros',
        component: AdminRetirosComponent,
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthSharedGuard]           
      },
    ]),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CategoryService,
    ProductService,
    StatusService,
    OrderService,
    AuthService,
    UserService,
    RoleService,
    ShoppingBagService,
    ShoppingCartService,
    RetiroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



