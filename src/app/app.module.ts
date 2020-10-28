import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2"
import { AngularFireDatabaseModule} from "angularfire2/database"
import { AngularFireAuthModule } from "angularfire2/auth"

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

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
