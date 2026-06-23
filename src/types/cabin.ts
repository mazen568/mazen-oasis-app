import { Tables } from '@/types/database.types';

export type Cabin = Pick<Tables<'cabins'>, 'id' | 'name' | 'max_capacity' | 'regular_price' | 'discount' | 'image'>;