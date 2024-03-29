import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'

@Module({
	controllers: [GenreController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: GenreModel,
				schemaOptions: {
					collection: 'Genre',
				},
			},
		]),
	],
	providers: [GenreService],
})
export class GenreModule {}
