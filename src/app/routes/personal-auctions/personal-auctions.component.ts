import { Component } from '@angular/core';
import {AuctionsService} from "../../services/auctions.service";

@Component({
  selector: 'app-personal-auctions',
  standalone: true,
  imports: [],
  templateUrl: './personal-auctions.component.html',
  styleUrl: './personal-auctions.component.scss'
})
export class PersonalAuctionsComponent {

  constructor(private auctionService: AuctionsService) {
  }

  ngOnInit(): void {
    this.auctionService.getAuctionForUser().subscribe((result: any) => {
      console.log(result);
    });
  }
}
