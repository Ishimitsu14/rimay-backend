import { Prisma, User as PrismaUser } from '@apps/user-identity';
import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AuthTokenModel } from './auth-token.model';
import { AccountModel } from './account.model';
import {
  BaseModel,
  FieldType,
  RelationField,
} from '@packages/prisma-to-graphql-model';
import { IsOptional } from 'class-validator';

type IUserModel = PrismaUser &
  Partial<
    Prisma.UserGetPayload<{
      include: {
        account: true;
        authToken: true;
      };
    }>
  >;

@ObjectType('User')
@Directive('@key(fields: "id")')
export class UserModel extends BaseModel implements IUserModel {
  @Field(() => ID)
  @FieldType(() => Number)
  id: number;

  @Field(() => String)
  @FieldType(() => String)
  username: string;

  @Field(() => String)
  @FieldType(() => String)
  email: string;

  @Field(() => Boolean)
  @FieldType(() => Boolean)
  emailVerified: boolean;

  @Field(() => String)
  @FieldType(() => String)
  image: string;

  @FieldType(() => String)
  password: string | null;

  @Field(() => [AuthTokenModel])
  @RelationField(true)
  authToken: AuthTokenModel[];

  @Field(() => [AccountModel])
  @RelationField(true)
  account: AccountModel[];
}
