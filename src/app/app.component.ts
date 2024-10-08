import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'auction-front';

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }
}
