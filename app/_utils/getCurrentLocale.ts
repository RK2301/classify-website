import { cookies, headers } from "next/headers";

const allLocales = ['en', 'ar', 'he'];

/**  This function retrieves the current locale based on the user's cookie or the accept-language header.
 * If a cookie named 'lang' is set, it uses that value.
 * If the cookie is not set, it checks the 'accept-language' header to determine the preferred language.
*/
export const getCurrentLocale = async () => {
    let selectedLocale = (await cookies()).get('lang')?.value;

    //if no cookie is set, use the accept-language header
    // and default to 'en' if the preferred language is not supported
    if (!selectedLocale) {
        const all_headers = await headers()
        const accept_langs = all_headers.get('accept-language');

        const preferredLang = accept_langs?.split(',')[0]?.split('-')[0] || 'en';
        selectedLocale = allLocales.includes(preferredLang) ? preferredLang : 'en'
    }

    return selectedLocale;
}