import  {Type} from '@sinclair/typebox'

export const Pagination = Type.Object({
    page: Type.Number({default: 1}),
    limit: Type.Number({default: 10}),

})
export const ProductId = Type.Object({
    productId: Type.String(),
})
export const Url = Type.Object({
    url: Type.String(),
})