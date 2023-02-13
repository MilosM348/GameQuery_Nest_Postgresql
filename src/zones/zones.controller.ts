import { Controller, Get, Post, Put, Delete, Body, Query, Res , Req } from '@nestjs/common';
import { IsString } from "class-validator";
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { Request, Response } from 'express';

class SearchFilter {
  @ApiProperty()
  @IsString()
  TextString: string;
}

@ApiTags('Zone')
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  async create(@Req() req:Request, @Res() res: Response,@Body() createZoneDto: CreateZoneDto) {
    // return this.zonesService.create(createZoneDto);
    let createData = await this.zonesService.create(createZoneDto);
    return res.send(createData);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any = await this.zonesService.findAll();
    return res.send(findAll);
  }

  @Get('/search')
  async findSearch(@Req() req:Request, @Res() res: Response, @Body() SearchFilter: SearchFilter) {
    let getSearch = await this.zonesService.findFilter([SearchFilter]);
    return res.send(getSearch)
  }

  @Get('/getOne')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne = await this.zonesService.findOne(id);
    return res.send(getOne)
  }

  @Put()
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: string, @Body() updateZoneDto: CreateZoneDto) {
    let updateData = await this.zonesService.update(id, updateZoneDto);
    return res.send(updateData);
  }

  @Delete()
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: string) {
    let deleteData = await  this.zonesService.remove(+id);
    return res.send(deleteData);
  }
}
