import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object;
    const property = args.property;

    const repository = getRepository(entity.constructor.name);
    const existingRecord = await repository.findOne({ [property]: value });
    return !existingRecord;
  }
}

