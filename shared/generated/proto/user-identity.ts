/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "USER_IDENTITY";

export enum ProviderEnum {
  UNKNOWN = 0,
  GOOGLE = 1,
  UNRECOGNIZED = -1,
}

export function providerEnumFromJSON(object: any): ProviderEnum {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ProviderEnum.UNKNOWN;
    case 1:
    case "GOOGLE":
      return ProviderEnum.GOOGLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProviderEnum.UNRECOGNIZED;
  }
}

export function providerEnumToJSON(object: ProviderEnum): string {
  switch (object) {
    case ProviderEnum.UNKNOWN:
      return "UNKNOWN";
    case ProviderEnum.GOOGLE:
      return "GOOGLE";
    case ProviderEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  password: string;
  image: string;
  authToken: AuthToken[];
  account: Account[];
}

export interface Account {
  id: number;
  userId: number;
  provider: ProviderEnum;
  user: User | undefined;
}

export interface AuthToken {
  id: number;
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: User | undefined;
}

export interface SignInWithProviderRequest {
  email: string;
  image: string;
  provider: ProviderEnum;
}

export interface CreateAuthTokenRequest {
  id: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface CanRefreshAuthTokenRequest {
  refreshToken: string;
}

export interface GetUserByIdRequest {
  id: number;
}

function createBaseUser(): User {
  return { id: 0, username: "", email: "", emailVerified: false, password: "", image: "", authToken: [], account: [] };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.emailVerified !== false) {
      writer.uint32(32).bool(message.emailVerified);
    }
    if (message.password !== "") {
      writer.uint32(42).string(message.password);
    }
    if (message.image !== "") {
      writer.uint32(50).string(message.image);
    }
    for (const v of message.authToken) {
      AuthToken.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.account) {
      Account.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.emailVerified = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.password = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.image = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.authToken.push(AuthToken.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.account.push(Account.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      emailVerified: isSet(object.emailVerified) ? globalThis.Boolean(object.emailVerified) : false,
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      image: isSet(object.image) ? globalThis.String(object.image) : "",
      authToken: globalThis.Array.isArray(object?.authToken)
        ? object.authToken.map((e: any) => AuthToken.fromJSON(e))
        : [],
      account: globalThis.Array.isArray(object?.account) ? object.account.map((e: any) => Account.fromJSON(e)) : [],
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.emailVerified !== false) {
      obj.emailVerified = message.emailVerified;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.image !== "") {
      obj.image = message.image;
    }
    if (message.authToken?.length) {
      obj.authToken = message.authToken.map((e) => AuthToken.toJSON(e));
    }
    if (message.account?.length) {
      obj.account = message.account.map((e) => Account.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.email = object.email ?? "";
    message.emailVerified = object.emailVerified ?? false;
    message.password = object.password ?? "";
    message.image = object.image ?? "";
    message.authToken = object.authToken?.map((e) => AuthToken.fromPartial(e)) || [];
    message.account = object.account?.map((e) => Account.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAccount(): Account {
  return { id: 0, userId: 0, provider: 0, user: undefined };
}

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    if (message.provider !== 0) {
      writer.uint32(24).int32(message.provider);
    }
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.userId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.provider = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      provider: isSet(object.provider) ? providerEnumFromJSON(object.provider) : 0,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.provider !== 0) {
      obj.provider = providerEnumToJSON(message.provider);
    }
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
    return Account.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = createBaseAccount();
    message.id = object.id ?? 0;
    message.userId = object.userId ?? 0;
    message.provider = object.provider ?? 0;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseAuthToken(): AuthToken {
  return { id: 0, userId: 0, accessToken: "", refreshToken: "", expiresAt: "", user: undefined };
}

export const AuthToken = {
  encode(message: AuthToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    if (message.accessToken !== "") {
      writer.uint32(26).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(34).string(message.refreshToken);
    }
    if (message.expiresAt !== "") {
      writer.uint32(42).string(message.expiresAt);
    }
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.userId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.expiresAt = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthToken {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      expiresAt: isSet(object.expiresAt) ? globalThis.String(object.expiresAt) : "",
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: AuthToken): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.expiresAt !== "") {
      obj.expiresAt = message.expiresAt;
    }
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthToken>, I>>(base?: I): AuthToken {
    return AuthToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthToken>, I>>(object: I): AuthToken {
    const message = createBaseAuthToken();
    message.id = object.id ?? 0;
    message.userId = object.userId ?? 0;
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.expiresAt = object.expiresAt ?? "";
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseSignInWithProviderRequest(): SignInWithProviderRequest {
  return { email: "", image: "", provider: 0 };
}

export const SignInWithProviderRequest = {
  encode(message: SignInWithProviderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.image !== "") {
      writer.uint32(18).string(message.image);
    }
    if (message.provider !== 0) {
      writer.uint32(48).int32(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignInWithProviderRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignInWithProviderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.image = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.provider = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignInWithProviderRequest {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      image: isSet(object.image) ? globalThis.String(object.image) : "",
      provider: isSet(object.provider) ? providerEnumFromJSON(object.provider) : 0,
    };
  },

  toJSON(message: SignInWithProviderRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.image !== "") {
      obj.image = message.image;
    }
    if (message.provider !== 0) {
      obj.provider = providerEnumToJSON(message.provider);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignInWithProviderRequest>, I>>(base?: I): SignInWithProviderRequest {
    return SignInWithProviderRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignInWithProviderRequest>, I>>(object: I): SignInWithProviderRequest {
    const message = createBaseSignInWithProviderRequest();
    message.email = object.email ?? "";
    message.image = object.image ?? "";
    message.provider = object.provider ?? 0;
    return message;
  },
};

function createBaseCreateAuthTokenRequest(): CreateAuthTokenRequest {
  return { id: 0, accessToken: "", refreshToken: "", expiresAt: "" };
}

export const CreateAuthTokenRequest = {
  encode(message: CreateAuthTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.accessToken !== "") {
      writer.uint32(18).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(26).string(message.refreshToken);
    }
    if (message.expiresAt !== "") {
      writer.uint32(34).string(message.expiresAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAuthTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateAuthTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expiresAt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateAuthTokenRequest {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      expiresAt: isSet(object.expiresAt) ? globalThis.String(object.expiresAt) : "",
    };
  },

  toJSON(message: CreateAuthTokenRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.expiresAt !== "") {
      obj.expiresAt = message.expiresAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateAuthTokenRequest>, I>>(base?: I): CreateAuthTokenRequest {
    return CreateAuthTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateAuthTokenRequest>, I>>(object: I): CreateAuthTokenRequest {
    const message = createBaseCreateAuthTokenRequest();
    message.id = object.id ?? 0;
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.expiresAt = object.expiresAt ?? "";
    return message;
  },
};

function createBaseCanRefreshAuthTokenRequest(): CanRefreshAuthTokenRequest {
  return { refreshToken: "" };
}

export const CanRefreshAuthTokenRequest = {
  encode(message: CanRefreshAuthTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanRefreshAuthTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanRefreshAuthTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CanRefreshAuthTokenRequest {
    return { refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "" };
  },

  toJSON(message: CanRefreshAuthTokenRequest): unknown {
    const obj: any = {};
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanRefreshAuthTokenRequest>, I>>(base?: I): CanRefreshAuthTokenRequest {
    return CanRefreshAuthTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanRefreshAuthTokenRequest>, I>>(object: I): CanRefreshAuthTokenRequest {
    const message = createBaseCanRefreshAuthTokenRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseGetUserByIdRequest(): GetUserByIdRequest {
  return { id: 0 };
}

export const GetUserByIdRequest = {
  encode(message: GetUserByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserByIdRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetUserByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserByIdRequest>, I>>(base?: I): GetUserByIdRequest {
    return GetUserByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserByIdRequest>, I>>(object: I): GetUserByIdRequest {
    const message = createBaseGetUserByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

export interface AuthService {
  SignInWithProvider(request: SignInWithProviderRequest): Observable<User>;
  CreateAuthToken(request: CreateAuthTokenRequest): Observable<AuthToken>;
  CanRefreshAuthToken(request: CanRefreshAuthTokenRequest): Observable<User>;
}

export const AuthServiceServiceName = "USER_IDENTITY.AuthService";
export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AuthServiceServiceName;
    this.rpc = rpc;
    this.SignInWithProvider = this.SignInWithProvider.bind(this);
    this.CreateAuthToken = this.CreateAuthToken.bind(this);
    this.CanRefreshAuthToken = this.CanRefreshAuthToken.bind(this);
  }
  SignInWithProvider(request: SignInWithProviderRequest): Observable<User> {
    const data = SignInWithProviderRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "SignInWithProvider", data);
    return result.pipe(map((data) => User.decode(_m0.Reader.create(data))));
  }

  CreateAuthToken(request: CreateAuthTokenRequest): Observable<AuthToken> {
    const data = CreateAuthTokenRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "CreateAuthToken", data);
    return result.pipe(map((data) => AuthToken.decode(_m0.Reader.create(data))));
  }

  CanRefreshAuthToken(request: CanRefreshAuthTokenRequest): Observable<User> {
    const data = CanRefreshAuthTokenRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "CanRefreshAuthToken", data);
    return result.pipe(map((data) => User.decode(_m0.Reader.create(data))));
  }
}

export interface UserService {
  GetUserById(request: GetUserByIdRequest): Observable<User>;
}

export const UserServiceServiceName = "USER_IDENTITY.UserService";
export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || UserServiceServiceName;
    this.rpc = rpc;
    this.GetUserById = this.GetUserById.bind(this);
  }
  GetUserById(request: GetUserByIdRequest): Observable<User> {
    const data = GetUserByIdRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "GetUserById", data);
    return result.pipe(map((data) => User.decode(_m0.Reader.create(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
