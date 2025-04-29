import  {Type} from '@sinclair/typebox'

export const Pagination = Type.Object({
    page: Type.Number({default: 1}),
    limit: Type.Number({default: 10}),

})