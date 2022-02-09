import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 
import { environment } from 'src/environments/environment';



import { AdminComponent } from './layout/admin-page/admin.component';

const routes: Routes = [
  { 
    path: environment.FRONTEND_ROUTES.ADMIN, 
    component: AdminComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: environment.FRONTEND_ROUTES.VUE_ADMIN, loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: environment.FRONTEND_ROUTES.USERS, loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Utilisateurs' } },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: 'enabled', // for one load page, without reload
      relativeLinkResolution: 'legacy'
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class LocationRoutingModule { }