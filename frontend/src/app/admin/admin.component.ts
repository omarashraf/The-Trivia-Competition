import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment } from '../../environments/environment';

@Component({
    selector: 'admin-comp',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public email: string;
    public password: string;;
    public adminError: boolean = false;

    constructor
        (
        private http: Http,
        private AuthService: AuthService,
        private router: Router,
        private localStorageService: LocalStorageService
        ) { }
    onSubmitAdmin(): void {
        if (
            this.email !== "" &&
            this.email !== undefined &&
            this.password !== "" &&
            this.password !== undefined
        ) {
            this.AuthService.AdminLogin(this.email, this.password)
                .subscribe((res) => {
                    console.log(res),
                        localStorage.setItem('jwtToken', JSON.parse(res._body).token),
                        this.adminError = false
                }, err =>
                        this.adminError = true
                );
        }
        else {
            this.adminError = true;
        }
    }

    ngOnInit(): void {
        localStorage.setItem('current', JSON.stringify({ email: '', qIndex: '' }));
        this.adminError = false;
    }
}