import { HttpContextToken, HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const apiUrl = environment.apiUrl;
const url = environment.url;

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
    const Authreq = req.clone({
        url: preparerUrl(req.url),
        withCredentials: true,
        setHeaders: {
            'Access-Control-Expose-Headers': 'Authorization'
        }
    });
    return next(Authreq);
};

/**
 * Prépare l'url à exécuter en remplaçant éventuellement le domaine.
 * @param url l'url à exécuter.
 * @private
 */
export const preparerUrl = (url: string): string => {
	if (url.includes('assets')) {
		return url;
	}

	url = isAbsoluteUrl(url) ? url : apiUrl + '/' + url;
	return url.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Retourne true s'il s'agit d'une url complète c'est-à-dire qu'elle contient http.
 * @param url l'url à tester.
 * @private
 */
export const isAbsoluteUrl = (url: string): boolean => {
	const absolutePattern = /^http?:\/\//i;
	return absolutePattern.test(url);
}

export const IS_PUBLIC = new HttpContextToken(() => false);