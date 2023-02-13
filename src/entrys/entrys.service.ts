import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity'

@Injectable()
export class EntrysService {
  constructor(
    @InjectRepository(Entry) 
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    const petsDetails = this.entryRepository.create(createEntryDto);
    await this.entryRepository.save(petsDetails);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    let findAll = await this.entryRepository.findAndCount();
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
    let findFilter = await this.entryRepository.findAndCount({
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

  async findOne(EntryID: any) {
    const findOne = await this.entryRepository.findOne({
      where: {
          EntryID: EntryID,
      },
    })
    if(!findOne) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      // totalData : findAll && findAll.length ? findAll.length :  0,
      result : findOne
    }
  }

 async update(EntryID: any, updateEntryDto: UpdateEntryDto) {
    const result : any = await this.entryRepository.update({EntryID }, updateEntryDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(EntryID: any) {
    const result : any = await this.entryRepository.delete(EntryID);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}
