export declare const CreatePost: import("@sinclair/typebox").TObject<{
    content: import("@sinclair/typebox").TString;
}>;
export declare const UpdatePost: import("@sinclair/typebox").TObject<{
    content: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const Post: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    author: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        display_name: import("@sinclair/typebox").TString;
        username: import("@sinclair/typebox").TString;
    }>;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    content: import("@sinclair/typebox").TString;
}>]>;
export declare const PostsPaginated: import("@sinclair/typebox").TObject<{
    count: import("@sinclair/typebox").TNumber;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        author: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            display_name: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
        }>;
        createdAt: import("@sinclair/typebox").TString;
        updatedAt: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        content: import("@sinclair/typebox").TString;
    }>]>>;
}>;
