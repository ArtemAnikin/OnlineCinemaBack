import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../user.model'

export const User = createParamDecorator(
	(data: keyof UserModel, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<{ user: UserModel }>()
		const user = request.user

		return data ? user[data] : user
	}
)
