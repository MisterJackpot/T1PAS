import {Entity, model, property,hasMany, hasOne} from '@loopback/repository';
import {Product} from './product.model';
import {Customer} from './customer.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @hasMany(() => Product)
  products?: Product[];

  @hasOne(() => Customer)
  customer?: Customer;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}
