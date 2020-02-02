import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React",
            "Name": "Name",
            "email": "email",
            "Sold": "Sold",
            "Owner": "Owner",
            "Country": "Country"
        }
    },
    es: {
        translation: {
            "Welcome to React": "Bienvenido a React",
            "Name": "Nombre",
            "email": "email",
            "Sold": "Vendido",
            "Owner": "Responsable",
            "Country": "País"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;