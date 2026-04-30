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
      newPasswordSameAsOld: "New password can't be the same as your old password.",
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
      platform: "KEN",
      signedInAs: "Signed in as",
      welcomeBack: "Welcome",
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
      modules: [
        {
          count: "Collect",
          text: "Keep shopping, ideas, links, and reminders in one clean list.",
          title: "Lists",
        },
        {
          count: "Plan",
          text: "See what needs to be done and move through your day with less stress.",
          title: "Tasks",
        },
        {
          count: "Track",
          text: "Save your spending and understand where your money is going.",
          title: "Expenses",
        },
        {
          count: "Cook",
          text: "Save favorite meals, ingredients, and notes so dinner is easier.",
          title: "Recipes",
        },
        {
          count: "Balance",
          text: "Track calories and meals without turning it into a second job.",
          title: "Calories",
        },
        {
          count: "Go",
          text: "Keep places, dates, bookings, and travel ideas together.",
          title: "Trips",
        },
        {
          count: "Watch",
          text: "Build a watchlist for the movies and shows you do not want to forget.",
          title: "Watchlist",
        },
      ],
      ctaTitle: "Start keeping everything in one place.",
      offerText: "One app for the small things that usually end up scattered everywhere.",
      offerTitle: "What KEN offers",
      register: "Register",
      stats: [
        {
          text: "Lists, tasks, expenses, recipes, calories, trips and your watchlist.",
          title: "Everything together",
        },
        {
          text: "Add something quickly, then organize it when you want.",
          title: "Fast to use",
        },
        {
          text: "Everything is simple and easy to find.",
          title: "Easy to understand",
        },
      ],
      subtitle: "One place for lists, tasks, expenses, recipes, calories, trips and your watchlist.",
      title: "Keep your life organized.",
      welcome: "Your daily life, in one place",
    },
    modules: {
      calories: "Calories",
      comingSoon: "Coming soon",
      dashboard: "Dashboard",
      description: "This page is ready. Next we can add your real data, editing, and the details that make it useful day to day.",
      expenses: "Expenses",
      lists: "Lists",
      movies: "Watchlist",
      recipes: "Recipes",
      settings: "Settings",
      todos: "Tasks",
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
      newPasswordSameAsOld: "Nova lozinka ne može biti ista kao stara.",
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
          title: "Dnevni prikaz",
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
      platform: "KEN",
      signedInAs: "Prijavljeni kao",
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
      modules: [
        {
          count: "Sačuvaj",
          text: "Kupovina, ideje, linkovi i podsetnici na jednoj preglednoj listi.",
          title: "Liste",
        },
        {
          count: "Plan",
          text: "Vidi šta treba da završiš i prođi kroz dan sa manje stresa.",
          title: "Zadaci",
        },
        {
          count: "Prati",
          text: "Sačuvaj troškove i lakše razumi gde novac odlazi.",
          title: "Troškovi",
        },
        {
          count: "Kuvaj",
          text: "Sačuvaj omiljena jela, sastojke i beleške za lakše kuvanje.",
          title: "Recepti",
        },
        {
          count: "Balans",
          text: "Prati kalorije i obroke bez nepotrebnog komplikovanja.",
          title: "Kalorije",
        },
        {
          count: "Putuj",
          text: "Mesta, datumi, rezervacije i ideje za putovanja zajedno.",
          title: "Putovanja",
        },
        {
          count: "Gledaj",
          text: "Napravi listu filmova i serija koje ne želiš da zaboraviš.",
          title: "Videoteka",
        },
      ],
      ctaTitle: "Počni da držiš sve na jednom mestu.",
      offerText: "Jedna aplikacija za sve male stvari koje se obično raspu na sve strane.",
      offerTitle: "Šta KEN nudi",
      register: "Registracija",
      stats: [
        {
          text: "Liste, zadaci, troškovi, recepti, kalorije, putovanja i videoteka.",
          title: "Sve zajedno",
        },
        {
          text: "Dodaj nešto za par sekundi, pa sredi detalje kad ti odgovara.",
          title: "Brzo za korišćenje",
        },
        {
          text: "Sve je jednostavno i lako za pronalaženje.",
          title: "Lako za razumevanje",
        },
      ],
      subtitle: "Jedno mesto za liste, zadatke, troškove, recepte, kalorije, putovanja i videoteku.",
      title: "Drži svoj život sređen.",
      welcome: "Tvoj dan, na jednom mestu",
    },
    modules: {
      calories: "Kalorije",
      comingSoon: "U pripremi",
      dashboard: "Kontrolna tabla",
      description: "Stranica je spremna. Sledeće možemo da dodamo vaše podatke, uređivanje i sve detalje koji će je učiniti korisnom.",
      expenses: "Troškovi",
      lists: "Liste",
      movies: "Videoteka",
      recipes: "Recepti",
      settings: "Podešavanja",
      todos: "Zadaci",
      trips: "Putovanja",
    },
    notFound: {
      back: "Nazad na kontrolnu tablu",
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
