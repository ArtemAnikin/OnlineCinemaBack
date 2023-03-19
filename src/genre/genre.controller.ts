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
import { GenreService } from './genre.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { IdValidationPipes } from '../pipes/id.validation.pipe'
import { CreateGenreDto } from './dto/createGenre.dto'

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug)
	}

	@Get('/collections')
	async getCollections() {
		return this.genreService.getCollections()
	}

	@Get('')
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async byId(@Param('id', IdValidationPipes) id: string) {
		return this.genreService.byId(id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.genreService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipes) id: string,
		@Body() dto: CreateGenreDto
	) {
		return this.genreService.update(id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipes) id: string) {
		return this.genreService.delete(id)
	}
}
