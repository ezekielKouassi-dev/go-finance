import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcceuilComponent } from "./acceuil/acceuil.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'acceuil',
                component: AcceuilComponent
            },
            {
                path: '',
                redirectTo: 'acceuil',
                pathMatch: 'full'
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class EspaceUtilisateurRoutingModule {}