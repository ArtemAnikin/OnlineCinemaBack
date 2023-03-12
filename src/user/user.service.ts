import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from './user.model'
import { InjectModel } from 'nestjs-typegoose'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async byId(_id: string) {
		const user = await this.userModel.findById(_id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}
}
