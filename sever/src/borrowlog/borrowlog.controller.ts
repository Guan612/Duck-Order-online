import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowlogService } from './borrowlog.service';
import { CreateBorrowlogDto } from './dto/borrowlog.dto';

@Controller('borrowlog')
export class BorrowlogController {
  constructor(private readonly borrowlogService: BorrowlogService) {}

  @Post()
  create(@Body() createBorrowlogDto: CreateBorrowlogDto) {
    return this.borrowlogService.create(createBorrowlogDto);
  }

  @Get()
  findAll() {
    return this.borrowlogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowlogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowlogDto) {
    return this.borrowlogService.update(+id, updateBorrowlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowlogService.remove(+id);
  }
}
