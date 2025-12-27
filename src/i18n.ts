import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "common": {
        "loading": "Loading...",
        "save": "Save",
        "cancel": "Cancel",
        "edit": "Edit",
        "view": "View",
        "delete": "Delete",
        "actions": "Actions",
        "status": "Status"
      },
      "navbar": {
        "browseAds": "Browse Ads",
        "myAds": "My Ads",
        "profile": "Profile",
        "logout": "Logout",
        "login": "Login",
        "register": "Register"
      },
      "home": {
        "featuredAds": "Featured Ads"
      },
      "auth": {
        "loginTitle": "Login",
        "registerTitle": "Register",
        "username": "Username",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "email": "Email",
        "loggingIn": "Logging in...",
        "registering": "Registering...",
        "noAccount": "Don't have an account?",
        "hasAccount": "Already have an account?",
        "verifyTitle": "Verify Your Account",
        "verifyText": "Please enter the verification code sent to your email.",
        "verifyButton": "Verify",
        "verifying": "Verifying...",
        "errors": {
          "loginFailed": "Login failed. Please check your credentials.",
          "generic": "An error occurred.",
          "required": "{{field}} is required",
          "minLength": "Must be at least {{count}} characters",
          "invalidEmail": "Please enter a valid email address",
          "passwordRequirements": "Password must be 8-64 characters and include at least one uppercase letter, one lowercase letter, and one digit",
          "passwordsDoNotMatch": "Passwords do not match",
          "usernameTaken": "Username is already taken",
          "emailTaken": "Email is already taken"
        }
      },
      "ads": {
        "browseTitle": "Browse Ads",
        "searchPlaceholder": "Search ads...",
        "noAdsFound": "No ads found matching your search.",
        "myAdsTitle": "My Ads",
        "createNew": "Create New Ad",
        "noAdsYet": "You have no ads yet.",
        "activate": "Activate",
        "price": "Price",
        "title": "Title",
        "description": "Description",
        "location": "Location",
        "noDescription": "No description provided.",
        "noImages": "No images available",
        "editTitle": "Edit Ad",
        "enterTitlePrompt": "Enter a title for your new ad:",
        "city": "City",
        "cityPlaceholder": "Search for a city...",
        "currency": "Currency",
        "media": "Media",
        "uploadText": "Upload files by ",
        "selectFiles": "selecting them",
        "saving": "Saving...",
        "failedToCreate": "Failed to create ad",
        "failedToActivate": "Failed to activate ad",
        "notFound": "Ad not found."
      },
      "profile": {
        "title": "Profile & Settings",
        "language": "Language",
        "paymentMonitoring": "Pirate Chain Payment Monitoring",
        "paymentDesc": "To enable payment monitoring for your ads, please provide your Pirate Chain Viewing Key (z-view key).",
        "viewKeyPlaceholder": "Enter your zxview... key",
        "saveKey": "Save Key",
        "recentTransactions": "Recent Pirate Chain Transactions",
        "noTransactions": "No transactions found.",
        "keyUpdated": "Viewing key updated successfully."
      }
    }
  },
  pl: {
    translation: {
      "common": {
        "loading": "Ładowanie...",
        "save": "Zapisz",
        "cancel": "Anuluj",
        "edit": "Edytuj",
        "view": "Zobacz",
        "delete": "Usuń",
        "actions": "Akcje",
        "status": "Status"
      },
      "navbar": {
        "browseAds": "Przeglądaj ogłoszenia",
        "myAds": "Moje ogłoszenia",
        "profile": "Profil",
        "logout": "Wyloguj",
        "login": "Zaloguj",
        "register": "Zarejestruj"
      },
      "home": {
        "featuredAds": "Wyróżnione ogłoszenia"
      },
      "auth": {
        "loginTitle": "Logowanie",
        "registerTitle": "Rejestracja",
        "username": "Nazwa użytkownika",
        "password": "Hasło",
        "confirmPassword": "Potwierdź hasło",
        "email": "Email",
        "loggingIn": "Logowanie...",
        "registering": "Rejestracja...",
        "noAccount": "Nie masz konta?",
        "hasAccount": "Masz już konto?",
        "verifyTitle": "Zweryfikuj swoje konto",
        "verifyText": "Wprowadź kod weryfikacyjny wysłany na Twój e-mail.",
        "verifyButton": "Zweryfikuj",
        "verifying": "Weryfikacja...",
        "errors": {
          "loginFailed": "Logowanie nieudane. Sprawdź swoje dane.",
          "generic": "Wystąpił błąd.",
          "required": "{{field}} jest wymagane",
          "minLength": "Musi mieć co najmniej {{count}} znaków",
          "invalidEmail": "Wprowadź poprawny adres e-mail",
          "passwordRequirements": "Hasło musi mieć 8-64 znaki i zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę",
          "passwordsDoNotMatch": "Hasła nie zgadzają się",
          "usernameTaken": "Nazwa użytkownika jest już zajęta",
          "emailTaken": "Email jest już zajęty"
        }
      },
      "ads": {
        "browseTitle": "Przeglądaj ogłoszenia",
        "searchPlaceholder": "Szukaj ogłoszeń...",
        "noAdsFound": "Nie znaleziono ogłoszeń pasujących do wyszukiwania.",
        "myAdsTitle": "Moje ogłoszenia",
        "createNew": "Dodaj ogłoszenie",
        "noAdsYet": "Nie masz jeszcze żadnych ogłoszeń.",
        "activate": "Aktywuj",
        "price": "Cena",
        "title": "Tytuł",
        "description": "Opis",
        "location": "Lokalizacja",
        "noDescription": "Brak opisu.",
        "noImages": "Brak zdjęć",
        "editTitle": "Edytuj ogłoszenie",
        "enterTitlePrompt": "Wprowadź tytuł nowego ogłoszenia:",
        "city": "Miasto",
        "cityPlaceholder": "Szukaj miasta...",
        "currency": "Waluta",
        "media": "Media",
        "uploadText": "Wgraj pliki ",
        "selectFiles": "wybierając je",
        "saving": "Zapisywanie...",
        "failedToCreate": "Nie udało się utworzyć ogłoszenia",
        "failedToActivate": "Nie udało się aktywować ogłoszenia",
        "notFound": "Ogłoszenie nie znalezione."
      },
      "profile": {
        "title": "Profil i ustawienia",
        "language": "Język",
        "paymentMonitoring": "Monitorowanie płatności Pirate Chain",
        "paymentDesc": "Aby włączyć monitorowanie płatności, podaj swój klucz podglądu Pirate Chain (z-view key).",
        "viewKeyPlaceholder": "Wprowadź klucz zxview...",
        "saveKey": "Zapisz klucz",
        "recentTransactions": "Ostatnie transakcje Pirate Chain",
        "noTransactions": "Nie znaleziono transakcji.",
        "keyUpdated": "Klucz podglądu został zaktualizowany."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;