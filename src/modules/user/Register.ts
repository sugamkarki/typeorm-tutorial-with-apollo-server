import {
  Resolver,
  Mutation,
  Query,
  Arg,
  Authorized,
  UseMiddleware,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello world!!!";
  }
  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
