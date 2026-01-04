import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  "en-US": {
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
        "myAds": "Sales",
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
        "loginRequired": "Almost there! Please log in to access the requested page. New to Gimlee? <1>Register here</1>.",
        "registrationSuccess": "Your account has been registered and the confirmation code was sent to email {{email}}. Please log in to complete registration.",
        "verifyTitle": "Verify Your Account",
        "verifyText": "Please enter the verification code sent to your email.",
        "verifyPlaceholder": "Verification code",
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
        "deactivate": "Deactivate",
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
        "failedToDeactivate": "Failed to deactivate ad",
        "notFound": "Ad not found."
      },
      "sales": {
        "title": "Sales",
        "myAds": "My Ads",
        "myOrders": "My Sales",
        "orders": "Orders",
        "noOrders": "You have no sales yet.",
        "orderId": "Order ID",
        "buyer": "Buyer",
        "total": "Total",
        "date": "Date"
      },
      "purchases": {
        "buyNow": "Buy Now",
        "quantity": "Quantity",
        "paymentTitle": "Complete Payment",
        "sendAmount": "Please send exactly",
        "toAddress": "to the following address",
        "memo": "Memo (required)",
        "statusAwaiting": "Awaiting payment...",
        "statusComplete": "Payment complete!",
        "statusFailedTimeout": "Payment timed out.",
        "statusFailedUnderpaid": "Payment underpaid.",
        "statusCancelled": "Purchase cancelled.",
        "cancelPurchase": "Cancel Purchase",
        "confirmCancel": "Are you sure you want to cancel this purchase?",
        "partialPaymentWarning": "Warning: You have already paid {{paid}} {{currency}}. Cancelling this purchase will result in permanent loss of these funds. Are you sure you want to proceed?",
        "close": "Close",
        "timeLeft": "Time left: {{time}}",
        "paymentProgress": "Payment progress: {{paid}} / {{total}} {{currency}}",
        "storedPurchaseFound": "You have an active purchase. Click here to view it."
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
        "keyUpdated": "Viewing key updated successfully.",
        "failedToSaveLanguage": "Failed to save language preference."
      }
    }
  },
  "pl-PL": {
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
        "myAds": "Sprzedaż",
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
        "loginRequired": "Już prawie! Zaloguj się, aby uzyskać dostęp do wybranej strony. Pierwszy raz w Gimlee? <1>Zarejestruj się tutaj</1>.",
        "registrationSuccess": "Twoje konto zostało zarejestrowane, a kod potwierdzający został wysłany na adres {{email}}. Zaloguj się, aby dokończyć rejestrację.",
        "verifyTitle": "Zweryfikuj swoje konto",
        "verifyText": "Wprowadź kod weryfikacyjny wysłany na Twój e-mail.",
        "verifyPlaceholder": "Kod weryfikacyjny",
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
        "deactivate": "Dezaktywuj",
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
        "failedToDeactivate": "Nie udało się dezaktywować ogłoszenia",
        "notFound": "Ogłoszenie nie znalezione."
      },
      "sales": {
        "title": "Sprzedaż",
        "myAds": "Moje ogłoszenia",
        "myOrders": "Moja sprzedaż",
        "orders": "Zamówienia",
        "noOrders": "Nie masz jeszcze żadnej sprzedaży.",
        "orderId": "ID zamówienia",
        "buyer": "Kupujący",
        "total": "Suma",
        "date": "Data"
      },
      "purchases": {
        "buyNow": "Kup teraz",
        "quantity": "Ilość",
        "paymentTitle": "Dokończ płatność",
        "sendAmount": "Proszę wyślij dokładnie",
        "toAddress": "na poniższy adres",
        "memo": "Memo (wymagane)",
        "statusAwaiting": "Oczekiwanie na płatność...",
        "statusComplete": "Płatność zakończona!",
        "statusFailedTimeout": "Upłynął limit czasu płatności.",
        "statusFailedUnderpaid": "Niedopłata płatności.",
        "statusCancelled": "Zakup anulowany.",
        "cancelPurchase": "Anuluj zakup",
        "confirmCancel": "Czy na pewno chcesz anulować ten zakup?",
        "partialPaymentWarning": "Uwaga: Zapłacono już {{paid}} {{currency}}. Anulowanie tego zakupu spowoduje trwałą utratę tych środków. Czy na pewno chcesz kontynuować?",
        "close": "Zamknij",
        "timeLeft": "Pozostały czas: {{time}}",
        "paymentProgress": "Postęp płatności: {{paid}} / {{total}} {{currency}}",
        "storedPurchaseFound": "Masz aktywny zakup. Kliknij tutaj, aby go zobaczyć."
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
        "keyUpdated": "Klucz podglądu został zaktualizowany.",
        "failedToSaveLanguage": "Nie udało się zapisać preferencji języka."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en-US",
    load: 'currentOnly',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;