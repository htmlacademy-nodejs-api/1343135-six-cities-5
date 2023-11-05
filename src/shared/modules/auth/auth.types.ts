import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class TokenPayload {
  @Expose()
  @IsString()
    id: string;

  @Expose()
  @IsString()
    email: string;

  @Expose()
  @IsString()
    name: string;
}
