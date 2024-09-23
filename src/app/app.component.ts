import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterComponent } from "./master/master.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'orders';
}
