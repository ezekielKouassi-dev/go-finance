import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspaceUtilisateurComponent } from './espace-utilisateur.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { EspaceUtilisateurRoutingModule } from './espace-utilisateur-routing.module';



@NgModule({
  declarations: [
    AcceuilComponent
  ],
  imports: [
    CommonModule,
    EspaceUtilisateurRoutingModule
  ]
})
export class EspaceUtilisateurModule { }
