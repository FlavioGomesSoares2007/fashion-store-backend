import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/products.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  sku!: string; 

  @Column({ type: 'varchar', length: 20, nullable: false })
  size!: string; 

  @Column({ type: 'varchar', length: 50, nullable: false })
  color!: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number; 

  @Column({ type: 'int', default: 0, name: 'stock_quantity', nullable: false })
  stockQuantity!: number; 

  @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
  product!: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}