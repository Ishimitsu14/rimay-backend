import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInWithGoogleRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  picture: string;
}
