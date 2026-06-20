import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductVariant } from '../../variations/entities/variations.entity';
import { Category } from '../../categories/entities/categories.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name!: string; 

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: false })
  imageUrl!: string; 

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  category!: Category;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: ProductVariant[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}