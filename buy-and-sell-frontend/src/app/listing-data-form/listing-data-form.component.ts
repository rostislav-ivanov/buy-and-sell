import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css',
})
export class ListingDataFormComponent {
  @Input() buttonText: string = 'Submit';
  @Input() currentName: string = '';
  @Input() currentDescription: string = '';
  @Input() currentPrice: Number = 0;

  name: string = '';
  description: string = '';
  price: Number = 0;

  @Output() onSubmit = new EventEmitter<Listing>();

  constructor() {}

  ngOnInit() {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClick(): void {
    this.onSubmit.emit({
      id: '',
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: 0,
    });
  }
}
