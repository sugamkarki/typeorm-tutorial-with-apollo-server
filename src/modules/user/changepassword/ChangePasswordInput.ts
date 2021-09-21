import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  token: string;
}
