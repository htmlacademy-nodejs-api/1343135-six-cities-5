import { IsString, IsNumber, IsMongoId, Length, Min, Max } from 'class-validator';
import { CreateCommentValidation as validation } from './create-comment.validation.js';

export class CreateCommentDto {
  @IsString({ message: validation.text.message.format })
  @Length(
    validation.text.rule.minLength,
    validation.text.rule.maxLength,
    { message: validation.text.message.length }
  )
  public text: string;

  @IsNumber(
    { maxDecimalPlaces: validation.rating.rule.maxDecimalPlace },
    { message: validation.rating.message.format },
  )
  @Min(
    validation.rating.rule.min,
    { message: validation.rating.message.value }
  )
  @Max(
    validation.rating.rule.max,
    { message: validation.rating.message.value }
  )
  public rating: number;

  @IsMongoId({ message: validation.offerId.message.format })
  public offerId: string;

  public authorId: string;
}
