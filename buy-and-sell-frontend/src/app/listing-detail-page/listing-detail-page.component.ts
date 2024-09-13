import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css',
})
export class ListingDetailPageComponent {
  isLoading: boolean = true;
  listing: Listing = { id: '', name: '', description: '', price: 0, views: 0 };

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe((listing) => {
        this.listing = listing;
        this.isLoading = false;
      });
      this.listingsService
        .addViewToListing(id)
        .subscribe(() => console.log('Views updated!')); // Add this line
    }
  }
}
