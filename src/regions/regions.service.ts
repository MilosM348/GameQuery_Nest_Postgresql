import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity'

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) 
    private readonly regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const petsDetails = this.regionRepository.create(createRegionDto);
    await this.regionRepository.save(petsDetails);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    let findAll = await this.regionRepository.findAndCount({relations: ['type']});
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
    let findFilter = await this.regionRepository.findAndCount({
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

  async findOne(RegionID: any) {
    const findOne = await this.regionRepository.findOne({
      where: {
          RegionID: RegionID,
      },
      relations: ['type']
    })
    if(!findOne) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      // totalData : findAll && findAll.length ? findAll.length :  0,
      result : findOne
    }
  }

 async update(RegionID: any, updateRegionDto: UpdateRegionDto) {
    const result : any = await this.regionRepository.update({RegionID }, updateRegionDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(RegionID: any) {
    const result : any = await this.regionRepository.delete(RegionID);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}
