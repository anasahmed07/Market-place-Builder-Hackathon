import { type SchemaTypeDefinition } from 'sanity'
import customer from './customer'
import review from './review'
import product from './product'
import category from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [customer, product, review, category ],
}
