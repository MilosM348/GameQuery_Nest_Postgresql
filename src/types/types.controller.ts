import { Controller, Get, Post, Put, Delete, Body, Query, Res , Req } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Request, Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';


class SearchFilter {
  @ApiProperty()
  @IsString()
  TextString: string;
}

@ApiTags('Type')
@ApiHeader({
  name: 'Type api',
  description: 'A Custom Header'
})
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Data fetch successfully'})
  async create(@Req() req:Request, @Res() res: Response,@Body() createTypeDto: CreateTypeDto) {
    // return this.typesService.create(createTypeDto);
    let createData = await this.typesService.create(createTypeDto);
    return res.send(createData);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Data fetch successfully'})
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any = await this.typesService.findAll();
    return res.send(findAll);
  }

  @Get('/search')
  @ApiResponse({ status: 201, description: 'Data fetch successfully'})
  async findSearch(@Req() req:Request, @Res() res: Response, @Body() SearchFilter: SearchFilter) {
    let getSearch = await this.typesService.findFilter([SearchFilter]);
    return res.send(getSearch)
  }

  @Get('/getOne')
  @ApiResponse({ status: 201, description: 'Data fetch successfully'})
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne = await this.typesService.findOne(id);
    return res.send(getOne)
  }

  @Put()
  @ApiResponse({ status: 201, description: 'Data updated successfully'})
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: string, @Body() updateTypeDto: CreateTypeDto) {
    let updateData = await this.typesService.update(id, updateTypeDto);
    return res.send(updateData);
  }

  @Delete()
  @ApiResponse({ status: 201, description: 'Data deleted successfully'})
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: string) {
    let deleteData = await  this.typesService.remove(+id);
    return res.send(deleteData);
  }
}
