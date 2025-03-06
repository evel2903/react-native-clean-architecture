// src/core/presentation/i18n/locales/es.ts
export default {
    common: {
      close: "Cerrar",
    },
    core: {
      screens: {
        NotFound: {
          goHome: "Volver a la pantalla de inicio",
        },
      },
      errors: {
        screenNotFound: "Pantalla no encontrada",
        contextNotProvided: "{{contextName}} no está proporcionado.",
      },
    },
    auth: {
      screens: {
        Auth: {
          welcomeBack: "Bienvenido de nuevo",
          createAccount: "Crear cuenta",
          signInContinue: "Inicia sesión para continuar a la aplicación",
          registerGetStarted: "Regístrate para comenzar con la aplicación",
          login: "Iniciar sesión",
          register: "Registrarse",
          fullName: "Nombre completo",
          email: "Correo electrónico",
          emailOrUsername: "Correo electrónico o nombre de usuario",
          password: "Contraseña",
          confirmPassword: "Confirmar contraseña",
          forgotPassword: "¿Olvidaste tu contraseña?",
          orContinueWith: "o continúa con",
        },
      },
      errors: {
        passwordsDoNotMatch: "Las contraseñas no coinciden",
        invalidCredentials: "Correo electrónico o contraseña inválidos",
        emailAlreadyExists: "El correo electrónico ya existe",
        // New validation error messages
        emailRequired: "El correo electrónico es obligatorio",
        emailOrUsernameRequired: "El correo electrónico o nombre de usuario es obligatorio",
        invalidEmail: "Por favor, introduce un correo electrónico válido",
        usernameTooShort: "El nombre de usuario debe tener al menos 3 caracteres",
        invalidUsername: "El nombre de usuario solo puede contener letras, números y . _ -",
        passwordRequired: "La contraseña es obligatoria",
        passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
      },
    },
    post: {
      screens: {
        Posts: {
          loading: "Cargando...",
        },
        Post: {
          loading: "Cargando...",
        },
      },
    },
  };