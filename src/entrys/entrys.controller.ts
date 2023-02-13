import { Controller, Get, Post, Put, Delete, Body, Query, Res , Req } from '@nestjs/common';
import { IsString } from "class-validator";
import { ApiTags, ApiProperty } from '@nestjs/swagger';

import { EntrysService } from './entrys.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Request, Response } from 'express';

interface PossessorFilter {
  Entry: string;
  Type: string;
  Zone: string;
  Region: string;
  Entity: string;
}

class SearchFilter {
  @ApiProperty()
  @IsString()
  TextString: string;
}

@ApiTags('Entry')
@Controller('entrys')
export class EntrysController {
  constructor(private readonly entrysService: EntrysService) {}

  @Post()
  async create(@Req() req:Request, @Res() res: Response,@Body() createEntryDto: CreateEntryDto) {
    // return this.entrysService.create(createEntryDto);
    let createData = await this.entrysService.create(createEntryDto);
    return res.send(createData);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any = await this.entrysService.findAll();
    return res.send(findAll);
  }

  @Get('/getOne')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne = await this.entrysService.findOne(id);
    return res.send(getOne)
  }

  @Get('/search')
  async findSearch(@Req() req:Request, @Res() res: Response, @Body() SearchFilter: SearchFilter) {
    let getSearch = await this.entrysService.findFilter([SearchFilter]);
    return res.send(getSearch)
  }

  @Get('/zone')
  async findByZone(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getFilter = await this.entrysService.findFilter({ZoneID: id});
    return res.send(getFilter)
  }

  @Get('/region')
  async findByRegion(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getFilter = await this.entrysService.findFilter({RegionID: id});
    return res.send(getFilter)
  }

  @Get('/type')
  async findByType(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getFilter = await this.entrysService.findFilter({TypeID: id});
    return res.send(getFilter)
  }

  @Get('/possessor')
  async findByPossessor(@Req() req:Request, @Res() res: Response, @Body() possessorFilter: PossessorFilter) {
    const filters = Object.values(possessorFilter)
    let getFilter = await this.entrysService.findFilter(filters);
    return res.send(getFilter)
  }

  @Put()
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: string, @Body() updateEntryDto: CreateEntryDto) {
    let updateData = await this.entrysService.update(id, updateEntryDto);
    return res.send(updateData);
  }

  @Delete()
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: string) {
    let deleteData = await  this.entrysService.remove(+id);
    return res.send(deleteData);
  }
}
