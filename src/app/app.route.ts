import {Routes} from '@angular/router';
import {FolderFilesComponent} from './folder-files/folder-files.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'home/:id',
    component: AppComponent
  }
];
