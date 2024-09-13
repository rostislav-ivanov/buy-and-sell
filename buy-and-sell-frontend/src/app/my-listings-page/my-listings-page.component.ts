import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Listing } from '../types';
import { fakeMyListings } from '../fake-data';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css',
})
export class MyListingsPageComponent {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit() {
    this.listingsService.getListingsForUser().subscribe((listings) => {
      this.listings = listings;
    });
  }

  onDeleteClicked(listingId: string) {
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings.filter(
        (listing) => listing.id !== listingId
      );
    });
  }
}
