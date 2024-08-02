import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';
import { Utilisateur } from '../models/utilisateur.model';
import { URL } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtToken!: string | undefined;

	constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
	}

	/**
	 * Authentifie un utilisateur.
	 *
	 * @param credentials les accès de l'utilisateur.
	 */
	authentifier(credentials: any): Observable<Token> {
		return this.http.post<Token>(URL.connexion, credentials);
	}

	/**
	 * Cette méthode permet d'enregistrer le token dans le localStorage après l'authentification
	 * @param jwtToken
	 */
	enregistrerToken(jwtToken: string | undefined): void {
		this.jwtToken = jwtToken;
		if (typeof jwtToken === "string") {
			localStorage.setItem('token', jwtToken);
		}
	}

	/**
	 * Cette méthode permet de recuperer le token dans le localStorage après l'authentification
	 * @return any
	 */
	recupererToken(): string {
		const token = localStorage.getItem('token');
		return token ? token : '';
	}

	/**
	 * Retourne ture si un utilisateur est authentifié.
	 */
	isAuthenticated(): boolean {
		const token = this.recupererToken();
		if (token) {
			return !this.jwtHelper.isTokenExpired(token);
		}
		return false;
	}

	/**
	 * Recupère l'utilisateur à partir du token jwt.
	 */
	getUtilisateurConnecte(): Utilisateur | null {
		if (this.isAuthenticated()) {
			return this.decoderToken(this.recupererToken());
		}
		return null;
	}

	/**
	 * Décode le jwt token.
	 *
	 * @param jwtToken le token jwt.
	 */
	decoderToken(jwtToken: string) {
		const token = this.jwtHelper.decodeToken(jwtToken);
		return {
			nomPrenoms: token.nomPrenoms,
			email: token.email,
			username: token.username
		} as Utilisateur;
	}

}
