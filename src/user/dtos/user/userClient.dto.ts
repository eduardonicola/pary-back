import { Expose } from 'class-transformer';

export class UserAplicationClient {
  @Expose()
  uuid_user: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  name: string;
}
