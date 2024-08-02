import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { OtpComponent } from "./otp/otp.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'connexion', component: ConnexionComponent },
            { path: 'inscription', component: InscriptionComponent },
            { path: 'confirmation-par-otp', component: OtpComponent },
            { path: '', redirectTo: 'connexion', pathMatch: 'full' }
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {

}