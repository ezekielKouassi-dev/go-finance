import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared-angular-auth/models/login.model';
import { AuthService } from 'src/app/shared-angular-auth/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  formulaireConnexion!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  // TODO: docs
  initialiserFormulaire(): void {
    // Initialisation du formulaire de connexion
    this.formulaireConnexion = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(8), Validators.max(15)]]
    });
  }

  connexion(): void {
    if (!this.formulaireConnexion.valid) {
      return;
    }

    const utilisateur = this.formulaireConnexion.getRawValue() as Login;
      this.authService.authentifier(utilisateur).subscribe({
        next: token => {
          this.authService.enregistrerToken(token.token);
          this.router.navigate(['/espace-utilisateur/']);
        },
        error: error => {}
      });
  }
}
