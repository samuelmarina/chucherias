import { NgModule } from '@angular/core';

import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {MatBadgeModule} from '@angular/material/badge';

const MaterialComponents=[
  MatButtonModule,
  MatIconModule,
  MatBadgeModule
]

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
