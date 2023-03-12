import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { ActorDto } from './dto/actor.dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>
	) {}

	async bySlug(slug: string) {
		const actor = await this.actorModel.findOne({ slug }).exec()

		if (!actor) {
			throw new NotFoundException('Actor not found')
		}

		return actor
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{ name: RegExp(searchTerm, 'i') },
					{ slug: RegExp(searchTerm, 'i') },
				],
			}
		}

		//TODO Aggregation

		return this.actorModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	// Only for admin

	async byId(_id: string) {
		const actor = await this.actorModel.findById(_id)

		if (!actor) {
			throw new NotFoundException('Actor not found')
		}

		return actor
	}

	async create() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: '',
		}

		const actor = await this.actorModel.create(defaultValue)
		return actor._id
	}

	async update(_id: string, dto: ActorDto) {
		const updateActor = await this.actorModel
			.findByIdAndUpdate(_id, dto, {
				new: true,
			})
			.exec()

		if (!updateActor) {
			throw new NotFoundException('Actor not found')
		}

		return updateActor
	}

	async delete(_id: string) {
		const deleteActor = await this.actorModel.findByIdAndDelete(_id).exec()

		if (!deleteActor) {
			throw new NotFoundException('Actor not found')
		}

		return deleteActor
	}
}
