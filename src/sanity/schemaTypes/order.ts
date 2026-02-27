import { BasketIcon } from '@sanity/icons'

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    icon: BasketIcon,
    fields: [
        {
            name: 'name',
            title: 'Customer Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Customer Email',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Customer Address',
            type: 'string',
        },
        {
            name: 'total',
            title: 'Total Amount',
            type: 'number',
        },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'product', type: 'reference', to: [{ type: 'product' }] },
                        { name: 'quantity', type: 'number' },
                    ],
                },
            ],
        },
    ],
}
