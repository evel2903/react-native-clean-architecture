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

  async login(credentials: LoginCredentials) {
    try {
      this.setIsLoading(true);
      this.setError(null);
      
      // Mock authentication - in a real app, this would be an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just accept any credentials
      // and create a mock user
      const mockUser: UserEntity = {
        id: "1",
        name: "Demo User",
        email: credentials.email,
        avatar: "https://ui-avatars.com/api/?name=Demo+User"
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