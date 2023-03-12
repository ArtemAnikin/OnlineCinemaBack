import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from './user.model'
import { InjectModel } from 'nestjs-typegoose'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async byId() {
		// const user = await this.userModel.findById(_id)
		//
		// if (!user) {
		// 	throw new UnauthorizedException('Please sign in!')
		// }
		//
		// return user
		return {
			email: 'Email',
		}
	}
}
