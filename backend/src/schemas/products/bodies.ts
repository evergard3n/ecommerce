import { Partial, Type } from "@sinclair/typebox";
import CommonSchemas from "../commons/index.ts"

export const Products = Type.Object({
    id: Type.String(),
    name: Type.String(),
    image: Type.String(),
    price: Type.String(),
    brand: Type.String(),
    description: Type.String(),
    storage: Type.String()
})


export const TechnicalDetails = Type.Object({
    product_id: Type.String(),
    screen: Type.Object( {
        size: Type.String(),
        refresh_rate: Type.String(),

    }),
    camera: Type.Object({
        front: Type.Object({
            resolution: Type.String(),
            features: Type.String(),
        }) , 
        back: Type.Object({
            resolution: Type.String(),
            features: Type.String(),
        })
    }),
    cpu: Type.Object({
        cpu_name: Type.String(),
        os: Type.String(),
    }),
    battery: Type.Object({
        capacity: Type.String(),
        charge_voltage: Type.String(),
    }),
})

export const PhoneTechnicalDetails = Type.Object({
    product_id: Type.String(),
    screen: Type.String(),
    camera_front: Type.String(),
    camera_back: Type.String(),
    cpu: Type.String(),
    battery: Type.String(), 
})

export const LaptopTechnicalDetails = Type.Object({
    product_id: Type.String(),
    screen: Type.String(),
    cpu: Type.String(),
    ram: Type.String(),
    battery: Type.String(),
    more: Type.String(),
})

export const User = Type.Object({
    id: Type.String(),
    search_history: Type.Array(Type.String(), {default: null}),
    recommendations: Type.Array(Type.String(), {default: null}),
})

export const ProductsPaginated = CommonSchemas.Bodies.PaginationResult(Products)
export const TechnicalDetailsPaginated = CommonSchemas.Bodies.PaginationResult(TechnicalDetails)