import { injectable, inject } from "inversiland";
import { IAuthRepository } from "../../domain/specifications/IAuthRepository";
import LoginPayload from "../../application/types/LoginPayload";
import UserEntity from "../../domain/entities/UserEntity";
import IHttpClient, { IHttpClientToken } from "src/core/domain/specifications/IHttpClient";
import LoginDto from "../models/LoginDto";
import { plainToInstance } from "class-transformer";
import UserDto from "../models/UserDto";

@injectable()
class AuthRepository implements IAuthRepository {
  private readonly baseUrl = "/api/auth";

  constructor(
    @inject(IHttpClientToken) private readonly httpClient: IHttpClient
  ) {}

  public async login(credentials: LoginPayload): Promise<UserEntity> {
    try {
      
      // Make the API request
      const response: any = await this.httpClient.post(
        `${this.baseUrl}/login`, 
        credentials
      );
      
      
      // Extract user data from the response
      const userData = response.data.user;
      
      // Transform to domain entity using UserDto
      const userDto = plainToInstance(UserDto, userData);
      
      return userDto.toDomain();
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  public async logout(): Promise<void> {
    try {
      // In a real app, you might need to invalidate the token on server side
      // await this.httpClient.post(`${this.baseUrl}/logout`);
      
      // For now, we'll just return as if logout was successful
      return;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error(error instanceof Error ? error.message : 'Logout failed');
    }
  }
}

export default AuthRepository;