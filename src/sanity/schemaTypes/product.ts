import { ComposeSparklesIcon } from '@sanity/icons'

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: ComposeSparklesIcon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'price_id',
            title: 'Stripe Price ID',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        },
    ],
}
