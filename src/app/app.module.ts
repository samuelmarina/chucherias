import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2"
import { AngularFireDatabaseModule} from "angularfire2/database"
import { AngularFireAuthModule } from "angularfire2/auth"

import { AppComponent } from './app.component';
import { IconComponent } from './components/ui/icon/icon.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,

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
