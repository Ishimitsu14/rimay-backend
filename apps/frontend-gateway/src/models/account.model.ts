import {
  Account as PrismaAccount,
  Prisma,
  ProviderEnum,
} from '@apps/user-identity';
import {
  Directive,
  Field,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { UserModel } from './user.model';
import {
  BaseModel,
  FieldType,
  RelationField,
} from '@packages/prisma-to-graphql-model';

registerEnumType(ProviderEnum, {
  name: 'ProviderEnum',
});

type IAccountModel = PrismaAccount &
  Partial<
    Prisma.AccountGetPayload<{
      include: {
        user: true;
      };
    }>
  >;

@ObjectType('Account')
@Directive('@key(fields: "id")')
export class AccountModel extends BaseModel implements IAccountModel {
  @Field(() => Int)
  @FieldType(() => Number)
  id: number;

  @Field(() => Int)
  @FieldType(() => Number)
  userId: number;

  @Field(() => ProviderEnum)
  @FieldType(() => ProviderEnum)
  provider: ProviderEnum;

  @Field(() => UserModel)
  @RelationField()
  user: UserModel;
}
