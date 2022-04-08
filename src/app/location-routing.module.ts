import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { AuthGuard } from './features/login/_guards/auth.guard';




import { AdminComponent } from './layout/admin-page/admin.component';

const routes: Routes = [
  { 
    path:'',
    canActivate: [AuthGuard], 
    component: AdminComponent, 
    children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: environment.FRONTEND_ROUTES.VUE_ADMIN, loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: environment.FRONTEND_ROUTES.USERS, loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Utilisateurs' } },
    ]
  },
  
  { path:environment.FRONTEND_ROUTES.LOGIN, loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path:environment.FRONTEND_ROUTES.INSCRIPTION, loadChildren: () => import('./features/compte/compte.module').then(m => m.CompteModule) },
  { path: 'locaction', loadChildren: () => import('./features/location/location.module').then(m => m.LocationModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class LocationRoutingModule { }