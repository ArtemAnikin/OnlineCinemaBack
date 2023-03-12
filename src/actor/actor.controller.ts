import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { IdValidationPipes } from '../pipes/id.validation.pipe'
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug)
	}

	@Get('/get-all')
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async byId(@Param('id', IdValidationPipes) id: string) {
		return this.actorService.byId(id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.actorService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipes) id: string,
		@Body() dto: ActorDto
	) {
		return this.actorService.update(id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipes) id: string) {
		return this.actorService.delete(id)
	}
}
