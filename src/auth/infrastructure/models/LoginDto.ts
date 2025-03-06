import { Expose } from "class-transformer";
import PayloadDto from "src/core/infrastructure/models/PayloadDto";
import LoginPayload from "../../application/types/LoginPayload";

export default class LoginDto extends PayloadDto<LoginPayload> {
  @Expose()
  email!: string;

  @Expose()
  password!: string;

  transform(payload: LoginPayload) {
    return {
      email: payload.email,
      password: payload.password,
    };
  }
}