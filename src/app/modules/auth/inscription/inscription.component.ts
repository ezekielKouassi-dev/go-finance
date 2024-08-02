import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared-angular-auth/models/utilisateur.model';
import { UtilisateurService } from 'src/app/shared-angular-auth/services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  formulaireInscription!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private utilisateurService: UtilisateurService, 
    private router: Router) {
  }

  ngOnInit(): void {
    // Initialisation du formulaire d'inscription
    this.formulaireInscription = this.formBuilder.group({
      nomPrenoms: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8), Validators.max(15)]]
    });
  }

  enregistrer(): void {
    if (this.formulaireInscription.invalid) {
      return ;
    }

    const utilisateur = this.formulaireInscription.getRawValue() as Utilisateur;
    this.utilisateurService.enregistrer(utilisateur).subscribe({
      next: () => {
        this.router.navigate(['/auth/confirmation-par-otp']);
      },
      error: errors => {

      }
    })
  }
}
