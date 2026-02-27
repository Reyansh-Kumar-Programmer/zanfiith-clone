import { TagIcon } from '@sanity/icons'

export default {
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 100 },
    },
  ],
};
