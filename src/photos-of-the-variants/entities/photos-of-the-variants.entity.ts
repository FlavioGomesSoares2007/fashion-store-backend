import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../../variations/entities/variations.entity';

@Entity('photosOfTheVariants')
export class PhotosOfTheVariants {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  img!: string;

  @ManyToOne(() => ProductVariant, (vari) => vari.images, {
    onDelete: 'CASCADE',
  })
  variationsId!: ProductVariant;
}
