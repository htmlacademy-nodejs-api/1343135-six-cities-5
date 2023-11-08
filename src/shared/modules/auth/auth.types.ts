import { IsString, IsMongoId } from 'class-validator';
import { Expose } from 'class-transformer';

export class TokenPayload {
  @Expose()
  @IsString()
  @IsMongoId()
    id: string;
}
