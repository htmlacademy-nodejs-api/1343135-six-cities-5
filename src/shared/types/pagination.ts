import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public offset?: number;
}
