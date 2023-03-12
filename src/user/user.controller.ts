import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from './decorators/user.decoratoe'
import { UpdateUserDto } from './dto/updateUser.dto'
import { IdValidationPipes } from '../pipes/id.validation.pipe'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.userService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(_id, dto)
	}

	@Get('count')
	@Auth('admin')
	async getCount() {
		return this.userService.getCount()
	}

	@Get('get-all')
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipes) id: string) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipes) id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	async deleteUser(@Param('id', IdValidationPipes) id: string) {
		return this.userService.delete(id)
	}
}
