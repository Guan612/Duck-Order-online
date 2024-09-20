import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty({message: '密码不能为空'})
  @IsString()
  @MinLength(6, { message: '密码长度不能小于6位' })
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('CN',{message: '请输入正确的手机号'})
  @IsOptional()
  phone?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty({message: '密码不能为空'})
  @IsString()
  @MinLength(6, { message: '密码长度不能小于6位' })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('CN',{message: '请输入正确的手机号'})
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nickname?: string;
}
