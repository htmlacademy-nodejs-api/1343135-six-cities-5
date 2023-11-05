import { Request } from 'express';
import { RequestParams } from '../../lib/rest/types/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

export type SignupUserRequest = Request<RequestParams, UserRdo, CreateUserDto>
export type LoginUserRequest = Request<RequestParams, UserRdo, LoginUserDto>
