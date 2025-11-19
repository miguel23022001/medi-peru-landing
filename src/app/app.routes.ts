import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'servicios', component: ServicesComponent },
	{ path: 'nosotros', component: AboutComponent },
	{ path: 'contacto', component: ContactComponent },
	{ path: '**', redirectTo: '' },
];
