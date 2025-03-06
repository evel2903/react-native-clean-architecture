import { injectable, inject } from "inversiland";
import { makeAutoObservable } from "mobx";
import AuthStoreState from "../../types/AuthStoreState";
import UserEntity from "src/auth/domain/entities/UserEntity";
import LoginUseCase from "src/auth/application/useCases/LoginUseCase";
import LogoutUseCase from "src/auth/application/useCases/LogoutUseCase";
import LoginPayload from "src/auth/application/types/LoginPayload";

@injectable()
export class AuthStore implements AuthStoreState {
  isLoading = false;
  user: UserEntity | null = null;
  isAuthenticated = false;
  error: string | null = null;

  constructor(
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
    @inject(LogoutUseCase) private logoutUseCase: LogoutUseCase
  ) {
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

  validateCredentials(credentials: LoginPayload): boolean {
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

  async login(credentials: LoginPayload) {
    try {
      this.setIsLoading(true);
      this.setError(null);
      
      // Validate credentials before proceeding
      if (!this.validateCredentials(credentials)) {
        return false;
      }
      
      const user = await this.loginUseCase.execute(credentials);
      this.setUser(user);
      return true;
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Login failed");
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  async logout() {
    try {
      this.setIsLoading(true);
      await this.logoutUseCase.execute();
      this.setUser(null);
      this.setError(null);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Logout failed");
    } finally {
      this.setIsLoading(false);
    }
  }
}