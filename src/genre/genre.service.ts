import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateGenreDto } from './dto/createGenre.dto'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>
	) {}

	async bySlug(slug: string) {
		const genre = this.genreModel.findOne({ slug }).exec()

		if (!genre) {
			throw new NotFoundException('Genre not found')
		}

		return genre
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{ name: RegExp(searchTerm, 'i') },
					{ slug: RegExp(searchTerm, 'i') },
					{ description: RegExp(searchTerm, 'i') },
				],
			}
		}

		return this.genreModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	async getCollections() {
		const genres = await this.getAll()
		const collections = genres
		return collections
	}

	// Only for admin

	async byId(_id: string) {
		const genre = await this.genreModel.findById(_id)

		if (!genre) {
			throw new NotFoundException('Genre not found')
		}

		return genre
	}

	async create() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}

		const genre = await this.genreModel.create(defaultValue)
		return genre._id
	}

	async update(_id: string, dto: CreateGenreDto) {
		const updateGenre = await this.genreModel
			.findByIdAndUpdate(_id, dto, {
				new: true,
			})
			.exec()

		if (!updateGenre) {
			throw new NotFoundException('Genre not found')
		}

		return updateGenre
	}

	async delete(_id: string) {
		const deleteGenre = await this.genreModel.findByIdAndDelete(_id).exec()

		if (!deleteGenre) {
			throw new NotFoundException('Genre not found')
		}

		return deleteGenre
	}
}
