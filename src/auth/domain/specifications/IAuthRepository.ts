import UserEntity from "../entities/UserEntity";
import LoginPayload from "../../application/types/LoginPayload";

export const IAuthRepositoryToken = Symbol("IAuthRepository");

export interface IAuthRepository {
  login: (data: LoginPayload) => Promise<UserEntity>;
  logout: () => Promise<void>;
}