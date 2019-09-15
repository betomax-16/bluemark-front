import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, RequiredValidator } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMetcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmetted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmetted));
  }
}

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = '';
  pass = '';
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMetcher();
  constructor(private httpClient: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              @Inject( MAT_DIALOG_DATA ) public data: any) { }

  ngOnInit() {
  }

  Click() {

  }
}
