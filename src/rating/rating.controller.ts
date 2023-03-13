import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from '../user/decorators/user.decoratoe'
import { Types } from 'mongoose'
import { IdValidationPipes } from '../pipes/id.validation.pipe'
import { SetRatingDto } from './dto/setRating.dto'

@Controller('ratings')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Get(':movieId')
	@Auth()
	async getMovieValueByUser(
		@Param('movieId', IdValidationPipes) movieId: Types.ObjectId,
		@User('_id') userId: Types.ObjectId
	) {
		return this.ratingService.getMovieValueByUser(movieId, userId)
	}

	@UsePipes(new ValidationPipe())
	@Post('set-rating')
	@Auth()
	async setRating(
		@Body() dto: SetRatingDto,
		@User('_id') userId: Types.ObjectId
	) {
		return this.ratingService.setRating(userId, dto)
	}
}
