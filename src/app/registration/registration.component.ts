import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  disableButton = false;
  separateDialCode = false;
  randomNumber: number;
  public showPassword: boolean;

/*######### CountryCode Initialization #########*/
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  
  
  constructor(private formBuilder: FormBuilder, private router: Router, private notifyService: NotificationService) { }
  /*########## OtpCode CustomValidation #############*/
  otpCodeValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value === this.randomNumber
        ? null : {otpCodeValidationColor: control.value };

  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        acceptTerms: [false, Validators.requiredTrue],
        phone: ['', Validators.required],
        otpCode: ['', this.otpCodeValidation()],// custom validation
      }
    );
  }
  //To change PreferredCountries
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
//To get randomly generated otpcode
  generateOTP() {
    this.randomNumber = Math.floor(1000 + Math.random() * 9000);

  }
 // Submit Registration Form
  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return (
        this.notifyService.showError("Form is Invalid !!", "") //Error Toaster
      )
    }
    const data = JSON.stringify(this.registrationForm.value, null, 2);
    this.disableButton = true;
    this.notifyService.showSuccess("Successfully Registered!!", "");//Success Toaster
    this.router.navigate(['./login']);//Redirect to Login Page
    localStorage.setItem('myData', data)
  }



}