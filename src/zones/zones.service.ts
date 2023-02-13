import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity'

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone) 
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createZoneDto: CreateZoneDto) {
    const petsDetails = this.zoneRepository.create(createZoneDto);
    await this.zoneRepository.save(petsDetails);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    let findAll = await this.zoneRepository.findAndCount({relations: ['type']});
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
    let findFilter = await this.zoneRepository.findAndCount({
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

  async findOne(ZoneID: any) {
    const findOne = await this.zoneRepository.findOne({
      where: {
          ZoneID: ZoneID,
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

 async update(ZoneID: any, updateZoneDto: UpdateZoneDto) {
    const result : any = await this.zoneRepository.update({ZoneID }, updateZoneDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(ZoneID: any) {
    const result : any = await this.zoneRepository.delete(ZoneID);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}
