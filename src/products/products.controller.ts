import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    try {
      return this.productsService.getProductById(id);
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  @Get('slug/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    try {
      return this.productsService.getProductBySlug(slug);
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ) {
    try {
      return this.productsService.createProduct(createProductDto);
    } catch {
      throw new BadRequestException('Failed to create product');
    }
  }
}
