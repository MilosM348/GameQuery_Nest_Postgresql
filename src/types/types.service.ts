import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity'

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type) 
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    const petsDetails = this.typeRepository.create(createTypeDto);
    await this.typeRepository.save(petsDetails);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    let findAll = await this.typeRepository.findAndCount({relations: ['zones', 'regions']});
    console.log(findAll[1])
    if(!findAll) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : findAll && findAll.length ? findAll[1] :  0,
      result : findAll && findAll[0]
    }
  }

  async findFilter(filter) {
    let findFilter = await this.typeRepository.findAndCount({
      where: filter
    });
    console.log(findFilter[1])
    if(!findFilter) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : findFilter && findFilter.length ? findFilter[1] :  0,
      result : findFilter && findFilter[0]
    }
  }

  async findOne(TypeID: any) {
    const findOne = await this.typeRepository.findOne({
      where: {
          TypeID: TypeID,
      },
      relations: ['zones', 'regions']
    })
    if(!findOne) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      // totalData : findAll && findAll.length ? findAll.length :  0,
      result : findOne
    }
  }

 async update(TypeID: any, updateTypeDto: UpdateTypeDto) {
    const result : any = await this.typeRepository.update({TypeID }, updateTypeDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(TypeID: any) {
    const result : any = await this.typeRepository.delete(TypeID);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}
