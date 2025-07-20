import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEditMode = true;
      this.loadContact(this.contactId);
    }
  }

  loadContact(id: string): void {
    this.contactService.getContact(id).subscribe(
      contact => this.contactForm.patchValue(contact),
      error => console.error('Error loading contact', error)
    );
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      
      if (this.isEditMode && this.contactId) {
        this.contactService.updateContact(this.contactId, contactData).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error updating contact', error)
        );
      } else {
        this.contactService.addContact(contactData).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error adding contact', error)
        );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}