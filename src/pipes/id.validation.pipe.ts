import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipes implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata): any {
		if (metadata.type !== 'param') {
			return value
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException('Invalid id format')
		}

		return value
	}
}
