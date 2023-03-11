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

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async login(dto: AuthDto) {
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

		return newUser.save()
	}
}
