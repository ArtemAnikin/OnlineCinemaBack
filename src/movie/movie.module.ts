import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'

@Module({
	controllers: [MovieController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MovieModel,
				schemaOptions: {
					collection: 'Movie',
				},
			},
		]),
	],
	providers: [MovieService],
})
export class MovieModule {}
