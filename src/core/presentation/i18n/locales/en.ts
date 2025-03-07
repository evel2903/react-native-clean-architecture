// src/core/presentation/i18n/locales/en.ts
export default {
    common: {
      close: "Close",
    },
    core: {
      screens: {
        NotFound: {
          goHome: "Go to home screen",
        },
      },
      errors: {
        screenNotFound: "Screen not found",
        contextNotProvided: "{{contextName}} is not provided.",
      },
    },
    home: {
      title: "Home",
      welcome: "Welcome, {{name}}!",
      welcomeDescription: "What would you like to do today?",
      menu: "Menu",
      menuItems: {
        posts: "Posts",
        postsDescription: "View and manage your posts",
        profile: "Profile",
        profileDescription: "View and edit your profile",
        settings: "Settings",
        settingsDescription: "Configure app settings",
      },
    },
    auth: {
      screens: {
        Auth: {
          welcomeBack: "Welcome Back",
          createAccount: "Create Account",
          signInContinue: "Sign in to continue to the app",
          registerGetStarted: "Register to get started with the app",
          login: "Login",
          register: "Register",
          fullName: "Full Name",
          email: "Email",
          emailOrUsername: "Email or Username",
          password: "Password",
          confirmPassword: "Confirm Password",
          forgotPassword: "Forgot Password?",
          orContinueWith: "or continue with",
        },
      },
      errors: {
        passwordsDoNotMatch: "Passwords do not match",
        invalidCredentials: "Invalid email or password",
        emailAlreadyExists: "Email already exists",
        // New validation error messages
        emailRequired: "Email is required",
        emailOrUsernameRequired: "Email or username is required",
        invalidEmail: "Please enter a valid email address",
        usernameTooShort: "Username must be at least 3 characters long",
        invalidUsername: "Username can only contain letters, numbers, and . _ -",
        passwordRequired: "Password is required",
        passwordTooShort: "Password must be at least 6 characters long",
      },
    },
    post: {
      screens: {
        Posts: {
          loading: "Loading...",
        },
        Post: {
          loading: "Loading...",
        },
      },
    },
  };