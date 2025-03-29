import { Type } from "@sinclair/typebox";

export const ProductId = Type.Object({
    productId : Type.String()
})
export const UserId = Type.Object({
    userId : Type.String()
})
export const Url = Type.Object({
    url : Type.String()
})