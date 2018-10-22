import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { tap } from 'rxjs/operators';

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

  createContact(contact: Contact) {
    return this.httpClient.post(`${this.apiURL}/contacts/`, contact);
  }

  updateContact(contact: Contact) {
    return this.httpClient.put(`${this.apiURL}/contacts/${contact.id}`, contact);
  }

  deleteContact(id: number) {
    return this.httpClient.delete(`${this.apiURL}/contacts/${id}`);
  }

   getContacts(url?: string) {
    if (url) {
      return this.httpClient.get<Contact[]>(url, { observe: 'response' })
        .pipe(tap(res => {
          const Link = this.parse_link_header(res.headers.get('Link'));
          this.first = Link['first'];
          this.last  = Link['last'];
          this.prev  = Link['prev'];
          this.next  = Link['next'];
          console.log(Link);
          console.log(`Getting ${url}`);
        }))
    }

    return this.httpClient.get<Contact[]>(`${this.apiURL}/contacts?_page=1`, { observe: 'response'})
      .pipe(tap(res => {
        const Link = this.parse_link_header(res.headers.get('Link'));
        this.first = Link['first'];
        this.last  = Link['last'];
        this.prev  = Link['prev'];
        this.next  = Link['next'];
        console.log('first page');
        console.log(Link);
      }));
  }

  getContactById(id: number) {
    return this.httpClient.get<Contact>(`${this.apiURL}/contacts/${id}`);
  }
}
