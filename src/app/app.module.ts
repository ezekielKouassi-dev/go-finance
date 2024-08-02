import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaceUtilisateurComponent } from './modules/espace-utilisateur/espace-utilisateur.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptor } from './shared-angular-auth/interceptors/api-url-interceptor';
import { JwtInterceptor } from './shared-angular-auth/interceptors/jwt.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): string {
	const token = localStorage.getItem('token');
	return token ? token : '';
}

@NgModule({
  declarations: [
    AppComponent,
    EspaceUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: { tokenGetter: tokenGetter }
    })
  ],
  providers: [
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
