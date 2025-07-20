import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      contacts => this.contacts = contacts,
      error => console.error('Error loading contacts', error)
    );
  }

  addContact(): void {
    this.router.navigate(['/add']);
  }

  editContact(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(
        () => this.loadContacts(),
        error => console.error('Error deleting contact', error)
      );
    }
  }
}