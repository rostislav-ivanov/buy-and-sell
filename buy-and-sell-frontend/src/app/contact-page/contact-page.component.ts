import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { FormsModule } from '@angular/forms';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  listing: Listing = { id: '', name: '', description: '', price: 0, views: 0 };
  email: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe((listings) => {
        this.listing = listings;
        this.message = `Hi, I'm interested in your ${this.listing.name.toLowerCase()} listing. Please let me know if it's still available.`;
      });
    }
  }

  sendMessage() {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }
}
