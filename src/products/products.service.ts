import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { generateSlug } from '../../lib/util';

@Injectable()
export class ProductsService {
  constructor(private readonly db: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.db.product.findMany();
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.db.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.db.product.findFirst({ where: { slug } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.db.product.create({
      data: { ...createProductDto, slug: generateSlug(createProductDto.name) },
    });
    if (!product) {
      throw new Error('Failed to create product');
    }
    return product;
  }
}
