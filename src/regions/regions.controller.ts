import { Controller, Get, Post, Put, Delete, Body, Query, Res , Req } from '@nestjs/common';
import { IsString } from "class-validator";
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { Request, Response } from 'express';


class SearchFilter {
  @ApiProperty()
  @IsString()
  TextString: string;
}

@ApiTags('Region')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async create(@Req() req:Request, @Res() res: Response,@Body() createRegionDto: CreateRegionDto) {
    // return this.regionsService.create(createRegionDto);
    let createData = await this.regionsService.create(createRegionDto);
    return res.send(createData);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any = await this.regionsService.findAll();
    return res.send(findAll);
  }

  @Get('/search')
  async findSearch(@Req() req:Request, @Res() res: Response, @Body() SearchFilter: SearchFilter) {
    let getSearch = await this.regionsService.findFilter([SearchFilter]);
    return res.send(getSearch)
  }

  @Get('/getOne')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne = await this.regionsService.findOne(id);
    return res.send(getOne)
  }

  @Put()
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: string, @Body() updateRegionDto: CreateRegionDto) {
    let updateData = await this.regionsService.update(id, updateRegionDto);
    return res.send(updateData);
  }

  @Delete()
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: string) {
    let deleteData = await  this.regionsService.remove(+id);
    return res.send(deleteData);
  }
}
