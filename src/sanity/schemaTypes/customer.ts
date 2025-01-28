import { defineField, defineType } from "sanity";

export default defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).error("Name must be at least 2 characters long."),
    }),
    defineField({
      name: "userImage",
      title: "Customer Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("Invalid email address."),
    }),
    defineField({
      name: "password",
      title: "Password (Hashed)",
      type: "string",
      hidden: true, // This field should not be visible in the Studio
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.custom((phone) => {
          if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
            return "Invalid phone number.";
          }
          return true;
        }),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "street",
      title: "Street",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true, // Automatically generated
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "givenReviews",
      title: "Given Reviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "userImage",
    },
  },
});