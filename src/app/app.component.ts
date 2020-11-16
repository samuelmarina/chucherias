import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chucherias';

  @Input() public static logged: boolean = false;
  @Input() public static user: string='usuario';

}


