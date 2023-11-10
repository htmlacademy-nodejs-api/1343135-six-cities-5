import { LoginUserDto } from '../user/dto/login-user.dto.js';

export interface AuthService {
  authenticate(dto: LoginUserDto): Promise<string>;
}
