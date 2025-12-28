// hooks/useClientAxios.ts
'use client';

import axios, { AxiosInstance } from 'axios';
import { useLocale } from 'next-intl';

export function useClientAxios(): AxiosInstance {
    const locale = useLocale();               // <- provided by NextIntlClientProvider

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
        headers: {
            'Accept-Language': locale,           // <- automatically the current locale
        },
    });
}
