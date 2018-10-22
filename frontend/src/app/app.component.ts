import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getContacts().subscribe(res => {
      console.log(res.body);
      this.apiService
        .getContacts(this.apiService.next)
        .subscribe(res => { console.log(res.body); });
    });

    var contact = {
      "id": 202,
      "firstName": "Luke",
      "lastName": "Muga",
      "email": "mugapedia@gmail.com",
      "phone": "(254) 719-6447",
      "city": "Nairobi",
      "country": "Kenya",
      "title": "Software Developer"
    }

    this.apiService.createContact(contact)
      .subscribe(res => { console.log('Created a contact'); });

    var contact = {
      "id": 1,
      "firstName": "Al",
      "lastName": "Chemist",
      "email": "al.chemist@gmail.com",
      "phone": "(254) 771-0264",
      "city": "Nairobi",
      "country": "Kenya",
      "title": "Software Engineer"
    }

    this.apiService.updateContact(contact)
      .subscribe(res => { console.log('Updated the contact'); });

    this.apiService.deleteContact(201)
      .subscribe(res => { console.log('Deleted a contact') });
  }

}
