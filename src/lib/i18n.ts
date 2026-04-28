"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getPreferredLanguage,
  subscribeToLanguage,
  type KenLanguage,
} from "@/lib/language";

function getServerLanguage(): KenLanguage {
  return "en";
}

export const languageCopy = {
  en: {
    auth: {
      alreadyRegistered: "Already registered?",
      backToLogin: "Back to login",
      changePassword: "Change password",
      changing: "Changing...",
      confirmPassword: "Confirm password",
      continue: "Continue",
      continueWithGoogle: "Continue with Google",
      createAccount: "Create your account",
      creating: "Creating...",
      dontHaveAccount: "Don't have an account?",
      emailAddress: "Email address",
      forgotPassword: "Forgot password?",
      googleErrors: {
        google_access_denied: "Google sign-in was cancelled. Please try again.",
        google_email_missing: "Google account email is required.",
        google_invalid_state: "Google sign-in security check failed. Please try again.",
        google_not_configured: "Google login is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
        google_token_failed: "Google sign-in token exchange failed. Please try again.",
        google_token_missing: "Google sign-in token missing. Please try again.",
        google_userinfo_failed: "Could not fetch your Google profile.",
      },
      googleFailed: "Google sign-in failed.",
      hidePassword: "Hide password",
      login: "Log in",
      loginToContinue: "Log in to KEN to continue.",
      newPassword: "New password",
      or: "OR",
      password: "Password",
      passwordChanged: "Your password has been changed. You can now log in.",
      passwordResetFailed: "Password reset failed",
      registerFailed: "Registration failed",
      resetHelp: "Enter your account email and choose a new password.",
      serviceUnavailable: "Authentication service is unavailable right now. Please try again.",
      showPassword: "Show password",
      signIn: "Signing in...",
      signUp: "Sign up",
      validationEmailRequired: "Email is required",
      validationPasswordRequired: "Password is required",
      welcome: "Welcome",
      wrongCredentials: "Wrong email or password",
    },
    dashboard: {
      cards: {
        analytics: {
          text: "See what you have planned, spent, saved, or left for later.",
          title: "Daily overview",
        },
        capture: {
          text: "Save a task, note, or idea before it slips away.",
          title: "Quick notes",
        },
        plan: {
          text: "Keep trips, routines, and priorities in one place.",
          title: "Plans",
        },
      },
      openCommand: "Add something",
      platform: "KEN",
      signedInAs: "Signed in as",
      welcomeBack: "Welcome back",
    },
    header: {
      login: "Login",
      loggingOut: "Logging out...",
      logout: "Logout",
      search: "Search...",
      searchLabel: "Search",
      settings: "Settings",
      toggleLanguage: "Change language to Serbian",
      toggleTheme: "Toggle theme",
    },
    home: {
      login: "Log in",
      register: "Register",
      stats: {
        fast: "Everything important in one place",
        premium: "Clean, simple screens",
        secure: "Your own account and session",
      },
      subtitle: "Keep track of tasks, expenses, trips, recipes, movies, and the small things you do not want to forget.",
      title: "Your everyday things, organized",
      welcome: "Welcome to KEN",
    },
    modules: {
      calories: "Calories",
      comingSoon: "Coming soon",
      dashboard: "Dashboard",
      description: "This page is ready. Next we can add your real data, editing, and the details that make it useful day to day.",
      expenses: "Expenses",
      lists: "Lists",
      movies: "Movies",
      recipes: "Recipes",
      settings: "Settings",
      todos: "To-Do",
      trips: "Trips",
    },
    notFound: {
      back: "Back to dashboard",
      description: "The page you opened does not exist or has been moved.",
      title: "Page not found",
    },
  },
  sr: {
    auth: {
      alreadyRegistered: "Već imate nalog?",
      backToLogin: "Nazad na prijavu",
      changePassword: "Promenite lozinku",
      changing: "Čuvamo promenu...",
      confirmPassword: "Potvrdite lozinku",
      continue: "Nastavite",
      continueWithGoogle: "Nastavite uz Google",
      createAccount: "Napravite nalog",
      creating: "Pravimo nalog...",
      dontHaveAccount: "Još nemate nalog?",
      emailAddress: "Email adresa",
      forgotPassword: "Zaboravili ste lozinku?",
      googleErrors: {
        google_access_denied: "Google prijava je otkazana. Pokušajte ponovo.",
        google_email_missing: "Email Google naloga je obavezan.",
        google_invalid_state: "Google bezbednosna provera nije prošla. Pokušajte ponovo.",
        google_not_configured: "Google prijava još nije podešena. Dodajte GOOGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET.",
        google_token_failed: "Google prijava nije uspela. Pokušajte ponovo.",
        google_token_missing: "Google token nedostaje. Pokušajte ponovo.",
        google_userinfo_failed: "Ne možemo da učitamo vaš Google profil.",
      },
      googleFailed: "Google prijava nije uspela.",
      hidePassword: "Sakrijte lozinku",
      login: "Prijava",
      loginToContinue: "Prijavite se da nastavite u KEN.",
      newPassword: "Nova lozinka",
      or: "ILI",
      password: "Lozinka",
      passwordChanged: "Lozinka je uspešno promenjena. Možete se prijaviti.",
      passwordResetFailed: "Nismo uspeli da promenimo lozinku",
      registerFailed: "Nismo uspeli da napravimo nalog",
      resetHelp: "Unesite email adresu naloga i izaberite novu lozinku.",
      serviceUnavailable: "Servis za prijavu trenutno nije dostupan. Pokušajte ponovo.",
      showPassword: "Prikažite lozinku",
      signIn: "Prijavljivanje...",
      signUp: "Registracija",
      validationEmailRequired: "Email je obavezan",
      validationPasswordRequired: "Lozinka je obavezna",
      welcome: "Dobrodošli",
      wrongCredentials: "Pogrešan email ili lozinka",
    },
    dashboard: {
      cards: {
        analytics: {
          text: "Pogledajte šta je planirano, potrošeno, sačuvano ili ostavljeno za kasnije.",
          title: "Dnevni pregled",
        },
        capture: {
          text: "Sačuvajte zadatak, belešku ili ideju pre nego što je zaboravite.",
          title: "Brze beleške",
        },
        plan: {
          text: "Držite putovanja, rutine i prioritete na jednom mestu.",
          title: "Planovi",
        },
      },
      openCommand: "Dodajte nešto",
      platform: "KEN",
      signedInAs: "Prijavljeni ste kao",
      welcomeBack: "Dobrodošli",
    },
    header: {
      login: "Prijava",
      loggingOut: "Odjava...",
      logout: "Odjava",
      search: "Pretraga...",
      searchLabel: "Pretraga",
      settings: "Podešavanja",
      toggleLanguage: "Prebacite na engleski",
      toggleTheme: "Promenite temu",
    },
    home: {
      login: "Prijava",
      register: "Registracija",
      stats: {
        fast: "Sve važno na jednom mestu",
        premium: "Jednostavni i pregledni ekrani",
        secure: "Vaš nalog i vaša sesija",
      },
      subtitle: "Vodite zadatke, troškove, putovanja, recepte, filmove i sve sitnice koje ne želite da zaboravite.",
      title: "Vaše svakodnevne stvari, lepo složene",
      welcome: "Dobrodošli u KEN",
    },
    modules: {
      calories: "Kalorije",
      comingSoon: "U pripremi",
      dashboard: "Pregled",
      description: "Stranica je spremna. Sledeće možemo da dodamo vaše podatke, uređivanje i sve detalje koji će je učiniti korisnom.",
      expenses: "Troškovi",
      lists: "Liste",
      movies: "Filmovi",
      recipes: "Recepti",
      settings: "Podešavanja",
      todos: "Zadaci",
      trips: "Putovanja",
    },
    notFound: {
      back: "Nazad na pregled",
      description: "Stranica koju tražite ne postoji ili je u međuvremenu pomerena.",
      title: "Stranica nije pronađena",
    },
  },
} as const satisfies Record<KenLanguage, object>;

export function useLanguageCopy() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getPreferredLanguage,
    getServerLanguage
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    copy: languageCopy[language],
    language,
  };
}
