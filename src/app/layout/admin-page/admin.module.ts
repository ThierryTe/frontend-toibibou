import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FullScreenComponent } from '../fullscreen/fullscreen.component';
import { MenuComponent } from '../menu/menu.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


export const routes = [ 
  { 
    path: '', 
    component: AdminComponent, children: [
      { path: '', loadChildren: () => import('../../features/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
      { path: 'users', loadChildren: () => import('../../features/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
    ]
  } 
];



@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    BreadcrumbComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    BreadcrumbComponent 
  ],
  
})
export class AdminModule { }
