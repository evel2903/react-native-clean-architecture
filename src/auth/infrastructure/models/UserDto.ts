import { Expose } from "class-transformer";
import ResponseDto from "src/core/infrastructure/models/ResponseDto";
import UserEntity from "src/auth/domain/entities/UserEntity";

export default class UserDto extends ResponseDto<UserEntity> {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  avatar?: string;

  toDomain() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
    };
  }
}