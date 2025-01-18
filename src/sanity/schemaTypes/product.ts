import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'price',
            type: 'number',
            title: 'Price',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'discount',
            type: 'number',
            title: 'Discount (percentae %)',
        }),
        defineField({
            name: 'category',
            type: 'reference',
            title: 'Category',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),
        defineField({
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [{ type: 'image' }],
            validation: (Rule) => Rule.max(5).warning('You can upload up to 5 images only'),
        }),
        defineField({
            name: 'sizes',
            type: 'array',
            title: 'Sizes',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'colors',
            type: 'array',
            title: 'Colors',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'rating',
            type: 'number',
            title: 'Rating',
            validation: (Rule) => Rule.min(0).max(5),
        }),
        defineField({
            name: 'reviews',
            type: 'array',
            title: 'Reviews',
            of: [{ type: 'reference', to: [{ type: 'review' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'name',                // Product name
            subtitle: 'price',            // Product price
            media: 'images.0.asset',      // First image from the images array
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: `Price: $${subtitle}`,
                media,  // Display the first image
            };
        },
    },
});
