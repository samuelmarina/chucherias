import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
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
    ProductContainerComponent
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
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'bolsa',
        component: BolsaComponent
      },
      {
        path: 'carrito',
        component: CarritoComponent
      },
      {
        path: 'wishlist',
        component: WishListComponent
      },
      {
        path: 'tracking',
        component: TrackingComponent
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
        path: 'check-out',
        component: CheckOutComponent
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent
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
        component: ProductFormComponent
      },
      {
        path: 'admin/productos/:id',
        component: ProductFormComponent
      },
      {
        path: 'admin/productos',
        component: AdminProductosComponent
      },
      {
        path: 'admin/ordenes/:id',
        component: OrderFormComponent
      },
      {
        path: 'admin/ordenes',
        component: AdminOrdenesComponent
      },
      {
        path: 'admin/categories/nuevo',
        component: CategoryFormComponent
      },
      {
        path: 'admin/categories/:id',
        component: CategoryFormComponent
      },
      {
        path: 'admin/categories',
        component: AdminCategoriesComponent
      },
      {
        path: 'admin/payments/nuevo',
        component: PaymentFormComponent
      },
      {
        path: 'admin/payments/:id',
        component: PaymentFormComponent
      },
      {
        path: 'admin/payments',
        component: AdminPaymentsComponent
      },
    ]),
    BrowserAnimationsModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



