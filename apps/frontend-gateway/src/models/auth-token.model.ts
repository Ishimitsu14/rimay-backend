import {
  Directive,
  Field,
  HideField,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { AuthToken as PrismaAuthToken, Prisma } from '@apps/user-identity';
import { UserModel } from './user.model';
import {
  BaseModel,
  FieldType,
  RelationField,
} from '@packages/prisma-to-graphql-model';

type IAuthTokenModel = PrismaAuthToken &
  Partial<
    Prisma.AuthTokenGetPayload<{
      include: {
        user: true;
      };
    }>
  >;

@ObjectType('AuthToken')
@Directive('@key(fields: "id")')
export class AuthTokenModel extends BaseModel implements IAuthTokenModel {
  @Field(() => ID)
  @FieldType(() => Number)
  id: number;

  @HideField()
  @Field(() => Int)
  @FieldType(() => Number)
  userId: number;

  @Field(() => String)
  @FieldType(() => Number)
  accessToken: string;

  @Field(() => String)
  @FieldType(() => Number)
  refreshToken: string;

  @Field(() => Date)
  @FieldType(() => Date)
  expiresAt: Date;

  @Field(() => UserModel)
  @RelationField(false)
  user: UserModel;
}
