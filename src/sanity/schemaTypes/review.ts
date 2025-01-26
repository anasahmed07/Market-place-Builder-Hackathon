import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  type: 'document',
  title: 'Review',
  fields: [
    defineField({
      name: "brandReview",
      title: "Mark as Brand Review",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: 'product',
      type: 'reference',
      title: 'Product',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
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
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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
