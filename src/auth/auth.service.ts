import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly JwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register(dto: AuthDto) {
		const { email, password } = dto
		const isUserExist = await this.UserModel.findOne({ email })

		if (isUserExist) {
			throw new BadRequestException('This email already used')
		}

		const salt = await genSalt(10)

		const newUser = new this.UserModel({
			email,
			password: await hash(password, salt),
		})

		const tokens = await this.issueTokenPair(String(newUser._id))

		return {
			user: this.returnUserFields(newUser),
			...tokens,
		}
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.JwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.JwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return {
			refreshToken,
			accessToken,
		}
	}

	async validateUser(dto: AuthDto) {
		const { email, password } = dto
		const user = await this.UserModel.findOne({ email })

		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		const isValidPassword = await compare(password, user.password)

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password')
		}

		return user
	}

	returnUserFields(user: UserModel) {
		const { _id, email, isAdmin } = user
		return {
			_id,
			email,
			isAdmin,
		}
	}
}
