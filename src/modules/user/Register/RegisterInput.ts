import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email Already In Use" })
  email: string;

  @Field()
  @Length(1)
  password: string;
}
