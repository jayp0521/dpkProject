import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DpkFormComponent } from './components/dpk-form/dpk-form.component';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SliderItemsComponent } from './components/slider-items/slider-items.component';
import { SlidesComponent } from './components/slides/slides.component';
import { TempOptionsComponent } from './components/temp-options/temp-options.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'options' },
    { path: 'dpkCreate', component: DpkFormComponent },
    { path: 'dpk/:dpk/:name', component: SlidesComponent },
    { path: 'options', component: TempOptionsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'login', component: PasswordlessAuthComponent },
    { path: 'slides', component: SliderItemsComponent }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
