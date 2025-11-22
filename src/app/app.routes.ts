import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ServicesComponent } from './pages/services/services';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'servicios', component: ServicesComponent },
	{ path: 'nosotros', component: AboutComponent },
	{ path: 'contacto', component: ContactComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: '' },
];
