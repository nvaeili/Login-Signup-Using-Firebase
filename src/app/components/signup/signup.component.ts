import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmpassword: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
