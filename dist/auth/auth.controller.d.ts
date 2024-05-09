import { AuthService } from './auth.service';
import { UserSignIn } from 'src/common/datatype/dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userSignIn: UserSignIn): string;
}
