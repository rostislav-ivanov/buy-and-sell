import { Component } from '@angular/core';
import { Listing } from '../types';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing-page',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css',
})
export class ListingPageComponent {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit() {
    this.listingsService.getListings().subscribe((listings) => {
      this.listings = listings;
    });
  }
}
