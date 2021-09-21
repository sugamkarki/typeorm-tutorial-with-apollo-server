import { Resolver, Mutation, Query, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { redis } from "../../redis";
import { sendEmail } from "../../utils/sendEmail";
import { v4 } from "uuid";
import { forgetPasswordPrefix } from "../../constants/redisPrefixes";
@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return true;
    const token = v4();
    await redis.set(forgetPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration
    await sendEmail(
      email,
      `http://localhost:3000/user/changePassword/${token}`
    );
    return true;
  }
}
