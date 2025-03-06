// src/auth/presentation/stores/AuthStore/AuthStore.ts
import { injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import AuthStoreState from "../../types/AuthStoreState";
import UserEntity from "src/auth/domain/entities/UserEntity";

export interface LoginCredentials {
  email: string;
  password: string;
}

@injectable()
export class AuthStore implements AuthStoreState {
  isLoading = false;
  user: UserEntity | null = null;
  isAuthenticated = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setUser(user: UserEntity | null) {
    this.user = user;
    this.isAuthenticated = !!user;
  }

  setError(error: string | null) {
    this.error = error;
  }

  validateCredentials(credentials: LoginCredentials): boolean {
    // Server-side validation (in addition to client-side validation in the screen)
    const { email, password } = credentials;
    
    // Check if the input is empty
    if (!email) {
      this.setError('Email or username is required');
      return false;
    }
    
    // If it contains @ - validate as email
    if (email.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.setError('Invalid email format');
        return false;
      }
    } else {
      // Validate as username
      if (email.length < 3) {
        this.setError('Username must be at least 3 characters');
        return false;
      }
      
      // Check for invalid characters
      const usernameRegex = /^[a-zA-Z0-9_.\-]+$/;
      if (!usernameRegex.test(email)) {
        this.setError('Username contains invalid characters');
        return false;
      }
    }
    
    // Basic password validation
    if (!password || password.length < 6) {
      this.setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  }

  async login(credentials: LoginCredentials) {
    try {
      this.setIsLoading(true);
      this.setError(null);
      
      // Validate credentials before proceeding
      if (!this.validateCredentials(credentials)) {
        return false;
      }
      
      // Mock authentication - in a real app, this would be an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just accept valid credentials
      // and create a mock user
      
      // Optional: Add mock invalid credentials check
      if (credentials.email === "invalid@example.com" || credentials.email === "invalid") {
        this.setError('Invalid credentials');
        return false;
      }
      
      // Generate a display name based on the login method
      let displayName = "Demo User";
      let userEmail = credentials.email;
      
      // If it's a username, create a fake email
      if (!credentials.email.includes('@')) {
        userEmail = `${credentials.email}@example.com`;
        displayName = credentials.email.charAt(0).toUpperCase() + credentials.email.slice(1);
      }
      
      const mockUser: UserEntity = {
        id: "1",
        name: displayName,
        email: userEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName
        )}&background=random`
      };
      
      this.setUser(mockUser);
      return true;
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Login failed");
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  logout() {
    this.setUser(null);
    this.setError(null);
  }
}