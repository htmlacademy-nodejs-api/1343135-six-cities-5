import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { DocumentExists } from '../../types/document-exists.interface.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
  findById(id: UserEntity['id']): Promise<DocumentType<UserEntity> | null>
  findByEmail(email: UserEntity['email']): Promise<DocumentType<UserEntity> | null>
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
  login(dto: LoginUserDto, salt: string): Promise<boolean>
  update(id: UserEntity['id'], dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>
}
