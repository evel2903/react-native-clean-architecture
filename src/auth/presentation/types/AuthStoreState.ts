import UserEntity from "src/auth/domain/entities/UserEntity";

export default interface AuthStoreState {
  isLoading: boolean;
  user: UserEntity | null;
  isAuthenticated: boolean;
  error: string | null;
}