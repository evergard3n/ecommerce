import { TSchema } from "@sinclair/typebox";
export declare const PaginationResult: <Schema extends TSchema>(itemsSchema: Schema) => import("@sinclair/typebox").TObject<{
    count: import("@sinclair/typebox").TNumber;
    data: import("@sinclair/typebox").TArray<Schema>;
}>;
