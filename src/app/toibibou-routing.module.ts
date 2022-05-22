import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { AdminComponent } from './layout/admin-page/admin.component';

const routes: Routes = [
  { 
    path:'',
    component: AdminComponent, 
    children: [
        { path: environment.FRONTEND_ROUTES.VUE_ADMIN, loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: environment.FRONTEND_ROUTES.SITE, loadChildren: () => import('./features/site/site.module').then(m => m.SiteModule), data:{breadcrumb: 'Sites'}},
        { path: environment.FRONTEND_ROUTES.COLLABORATEUR, loadChildren: () => import('./features/collaborateur/collaborateur.module').then(m => m.CollaborateurModule),data:{breadcrumb:'Collaborateur'}},
        { path: environment.FRONTEND_ROUTES.PAYS, loadChildren: () => import('./features/pays/pays.module').then(m => m.PaysModule),data:{breadcrumb:'Pays'} },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class ToibibouRoutingModule { }