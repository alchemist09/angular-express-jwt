import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'country', 'title', 'actions'];

  dataSource = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getContacts().subscribe(res => {
      this.dataSource = res.body;
    })
  }

}
