import bcrypt from "bcryptjs";
import { Resolver, Mutation, Query, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { redis } from "../../redis";
import { forgetPasswordPrefix } from "../../constants/redisPrefixes";
import { ChangePasswordInput } from "./changepassword/ChangePasswordInput";
@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgetPasswordPrefix + token);
    if (!userId) return null;
    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }
    await redis.del(forgetPasswordPrefix + token);
    user.password = await bcrypt.hash(password, 12);
    await user.save();
    // @ts-ignore
    ctx.req.session!.userId = user.id;
    return user;
  }
}
