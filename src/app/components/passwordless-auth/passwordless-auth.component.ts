import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SideNavToggleService } from '../../services/side-nav-toggle.service';

declare var particlesJS: any;

@Component({
    selector: 'app-passwordless-auth',
    templateUrl: './passwordless-auth.component.html',
    styleUrls: ['./passwordless-auth.component.css']
})
export class PasswordlessAuthComponent implements OnInit {
    user: Observable<any>;
    emailSent = false;

    errorMessage: string;

    emailForm: FormGroup;

    constructor(private afAuth: AngularFireAuth, private router: Router, private fb: FormBuilder, private sideNavToggleService: SideNavToggleService) {
    }

    ngOnInit() {
        particlesJS.load('particles', 'assets/data/particlesjs-image-config.json');
        this.sideNavToggleService.toggleSidenav(true);
        this.user = this.afAuth.authState;

        const url = this.router.url;
        this.confirmSignIn(url);

        this.reactiveForm();
    }

    /* Reactive form */
    reactiveForm() {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    async sendEmailLink() {
        const email = this.emailForm.value.email;
        const actionCodeSettings = {
            // Redirect URL
            url: `${environment.url}login`,
            handleCodeInApp: true
        };

        try {
            await this.afAuth.auth.sendSignInLinkToEmail(
                email,
                actionCodeSettings
            );
            window.localStorage.setItem('emailForSignIn', email);
            this.emailSent = true;

        } catch (err) {
            this.errorMessage = err.message;
        }
    }

    async anonSignIn() {
        await this.afAuth.auth.signInAnonymously().then(
            () => this.naviDPKCreate(),
            err => console.error(err)
        );
    }

    naviDPKCreate() {
        return setTimeout(() => this.router.navigate(['/dpkCreate']), 500);
    }

    confirmSignIn(url) {
        // console.log(url);
        try {
            if (this.afAuth.auth.isSignInWithEmailLink(url)) {
                const email = window.localStorage.getItem('emailForSignIn');

                // If missing email, prompt user for it
                // if (!email) {
                //     email = window.prompt('Please provide your email for confirmation');
                // }

                if (email) {
                    this.afAuth.auth.signInWithEmailLink(email, url).then(
                        () => this.naviDPKCreate()
                    );
                    window.localStorage.removeItem('emailForSignIn');
                }

                // Sign In user and remove the email localStorage
            }
        } catch (err) {
            this.errorMessage = err.message;
        }
    }

    public logout(): void {

        // NOTE: Firebase web-based user session are long-lived by default. If you want
        // to sign-out, you have to do so explicitly with an API call.
        this.afAuth.auth.signOut().then(
            () => {
                this.errorMessage = null;
                this.emailSent = false;
            },
            (error: any) => {
                this.errorMessage = error;
            }
        );

    }


}
