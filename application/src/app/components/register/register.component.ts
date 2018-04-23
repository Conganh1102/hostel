import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.form = this.formBuilder.group({
      // username
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validUsername
      ])],
      // email
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validEmail
      ])],
      // password
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validPassword
      ])],
      // confirmpassword
      confirmpassword: ['', Validators.compose([
        Validators.required
      ])]
    }, { validator: this.matchingPasswords('password', 'confirmpassword') });
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmpassword'].disable();
  }
  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmpassword'].enable();
  }

  validUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true }; // Return as invalid username
    }
  }

  validEmail(controls) {
    // Create a regular expression
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true }; // Return as invalid email
    }
  }

  validPassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true }; // Return as invalid password
    }
  }

  matchingPasswords(password, confirmpassword) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirmpassword].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true }; // Return as error: do not match
      }
    };
  }

  async checkUsername() {
    if (this.form.controls.username.invalid) {
      return;
    }
    if (!this.form.get('username').value) {
      this.usernameValid = false; // Return username as invalid
      return;
    }
    try {
      const data = await this.authService.checkUsername(this.form.get('username').value);
      this.usernameValid = data.success;
      this.usernameMessage = data.message; // Return error message
    } catch (error) {
      this.usernameValid = false; // Return username as invalid
      this.usernameMessage = error; // Return error message
    }
  }

  async checkEmail() {
    if (this.form.controls.email.invalid) {
      return;
    }
    if (!this.form.get('email').value) {
      this.emailValid = false; // Return email as invalid
      return;
    }
    try {
      const data = await this.authService.checkEmail(this.form.get('email').value);
      this.emailValid = data.success;
      this.emailMessage = data.message;
    } catch (error) {
      this.emailValid = false; // Return email as invalid
      this.emailMessage = error; // Return error message
    }
  }

  async onRegisterSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    try {
      const data = await this.authService.registerUser(user);
      this.messageClass = 'alert alert-success'; // Set a success class
      this.message = data.message; // Set a success message
      // After 2 second timeout, navigate to the login page
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect to login view
      }, 1000);

    } catch (error) {
      this.messageClass = 'alert alert-danger'; // Set an error class
      this.message = error; // Set an error message
      this.processing = false; // Re-enable submit button
      this.enableForm(); // Re-enable form
    }
  }

}
