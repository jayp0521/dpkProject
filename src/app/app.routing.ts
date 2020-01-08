import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpkFormComponent } from './components/dpk-form/dpk-form.component';
import { SlidesComponent } from './components/slides/slides.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dpkCreate'},
    {path: 'dpkCreate', component: DpkFormComponent},
    {path: 'dpk', component: SlidesComponent},
    {path: 'dpk/:id', component: SlidesComponent},
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);