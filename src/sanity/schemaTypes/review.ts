import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  type: 'document',
  title: 'Review',
  fields: [
    defineField({
      name: 'customer',
      type: 'reference',
      title: 'Customer',
      to: [{ type: 'customer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      type: 'reference',
      title: 'Product',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: (Rule) => Rule.required().min(0).max(5),
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment',
    }),
  ],
  preview: {
    select: {
      title: 'customer.name',       // Select the customer's name
      subtitle: 'rating',           // Select the rating for the subtitle
      media: 'product.images.0.asset',    // Select the first image from the product's images array
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Anonymous',  // Default title in case there's no customer name
        subtitle: `Rating: ${subtitle}/5`,  // Format the rating
        media: media || null,         // If no image, fallback to null
      };
    },
  },
});
