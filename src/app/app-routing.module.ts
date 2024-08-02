import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import("./modules/auth/auth.module").then(m=>m.AuthModule)
      },
      {
        path: 'espace-utilisateur',
        loadChildren: () => import("./modules/espace-utilisateur/espace-utilisateur.module").then(m=>m.EspaceUtilisateurModule)
      },
      {
        path: '',
        redirectTo: '/auth/connexion',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
