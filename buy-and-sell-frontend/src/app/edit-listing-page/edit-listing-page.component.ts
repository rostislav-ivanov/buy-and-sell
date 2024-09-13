import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { FormsModule } from '@angular/forms';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [FormsModule, ListingDataFormComponent, CommonModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css',
})
export class EditListingPageComponent {
  listing: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe((listing) => {
        this.listing = listing;
      });
    }
  }

  onSubmit(listing: Listing): void {
    this.listingsService
      .editListing(
        this.listing.id,
        listing.name,
        listing.description,
        listing.price
      )
      .subscribe(() => {
        this.router.navigateByUrl(`/my-listings`);
      });
  }
}
