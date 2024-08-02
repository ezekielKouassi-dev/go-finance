import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/shared-angular-auth/services/utilisateur.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  formulaireOtp!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulaireOtp = this.formBuilder.group({
      valeur1: ['', [Validators.required, Validators.min(0), Validators.maxLength(1)]],
      valeur2: ['', [Validators.required, Validators.maxLength(1)]],
      valeur3: ['', [Validators.required, Validators.maxLength(1)]],
      valeur4: ['', [Validators.required, Validators.maxLength(1)]]
    })
  }

  onSubmit(): void {
    this.utilisateurService.validerOtp(this.formaterCode()).subscribe({
      next: () => {
        this.router.navigate(['/espace-utilisateur/acceuil']);
      },
      error: () => {}
    })
  }

  formaterCode(): string {
    const rawValues = this.formulaireOtp.getRawValue();
    return Object.values(rawValues).join('');
  }
}
