import { Field, InputType } from "type-graphql";
import { Length, Min } from "class-validator";

@InputType()
export class PasswordInput {
  @Field()
  @Length(2)
  password: string;
}
