import { injectable } from "inversiland";
import { IAuthRepository } from "../../domain/specifications/IAuthRepository";
import LoginPayload from "../../application/types/LoginPayload";
import UserEntity from "../../domain/entities/UserEntity";

@injectable()
class AuthRepository implements IAuthRepository {
  public async login(credentials: LoginPayload): Promise<UserEntity> {
    // In a real app, this would be an API call
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just accept valid credentials
    // and create a mock user
    
    // Optional: Add mock invalid credentials check
    if (credentials.email === "invalid@example.com" || credentials.email === "invalid") {
      throw new Error('Invalid credentials');
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
    
    return mockUser;
  }

  public async logout(): Promise<void> {
    // In a real app, this would be an API call to invalidate the token
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }
}

export default AuthRepository;