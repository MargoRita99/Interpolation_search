import { InformationService } from './information.service'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {Information} from './information.entity';
import {
  Controller,
  Get,
  Post,
  Query, 
  Body,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Controller('Information_controller')
@ApiTags('Information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @ApiOperation({ summary: 'Поиск экспоната по title' }) 
  @Get('search')
  async searchInformation(@Query('title') title: string) {
    if (!title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }

    const information = await this.informationService.findInformationByTitle(title);
    if (!information) {
      throw new HttpException('Information not found', HttpStatus.NOT_FOUND);
    }
    return information;
  }

  @ApiOperation({ summary: 'Добавление нового экспоната' })
  @Post('add')
  async addInformation(@Body() newInformation: Partial<Information>) {
    const { title, description, image } = newInformation;
    if (!title || !description || !image) {
      throw new HttpException('Title, description and image are required', HttpStatus.BAD_REQUEST);
    }

    await this.informationService.addInformation(newInformation);
    return { message: 'Exhibit added successfully' };
  }
}