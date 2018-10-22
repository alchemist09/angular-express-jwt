import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "" ;

  constructor(private httpClient: HttpClient) { }

  parse_link_header(header) {
    if (header.length == 0 ) {
      return;
    }

    let parts = header.split(',')
    let links = {}
    parts.forEach(p => {
      let section = p.split(';');
      let url = section[0].replace(/<(.*)>/, '$1').trim();
      let name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    return links;
  }

  public createContact(contact: Contact) {
    return this.httpClient.post(`${this.apiURL}/contacts/`, contact);
  }

  public updateContact(contact: Contact) {
    return this.httpClient.put(`${this.apiURL}/contacts/${contact.id}`, contact);
  }

  public deleteContact(contact: Contact) {
    return this.httpClient.delete(`${this.apiURL}/contacts/${contact.id}`);
  }
}
