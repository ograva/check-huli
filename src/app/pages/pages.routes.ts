import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './home/home.component';
import { EditPlateComponent } from './edit-plate/edit-plate.component';
export const PagesRoutes: Routes = [
  {
    path: 'starter',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home Page',
      urls: [{ title: 'Home Page' }],
    },
  },
  {
    path: 'edit-plate',
    component: EditPlateComponent,
    data: {
      title: 'Edit Plate',
      urls: [{ title: 'Edit Plate Page' }],
    },
  },
];
