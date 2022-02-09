import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 



import { AdminComponent } from './layout/admin-page/admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: '', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
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
export class AssociationRoutingModule { }