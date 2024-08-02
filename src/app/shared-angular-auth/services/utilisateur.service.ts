import { HttpClient, HttpContext, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utilisateur } from "../models/utilisateur.model";
import { Observable } from "rxjs";
import { URL } from "../urls";

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {

    constructor(private http: HttpClient) {}

    enregistrer(utilisateur: Utilisateur): Observable<void> {
        return this.http.post<void>(URL.inscription, utilisateur);
    }

    validerOtp(code: string): Observable<void> {
        let httpParams = new HttpParams().set("code", code);
        return this.http.post<void>(URL.validationOtp, null, { params: httpParams });
    }
}
  