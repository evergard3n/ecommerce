export declare const Products: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    image: import("@sinclair/typebox").TString;
    price: import("@sinclair/typebox").TString;
    brand: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    storage: import("@sinclair/typebox").TString;
}>;
export declare const TechnicalDetails: import("@sinclair/typebox").TObject<{
    product_id: import("@sinclair/typebox").TString;
    screen: import("@sinclair/typebox").TObject<{
        size: import("@sinclair/typebox").TString;
        refresh_rate: import("@sinclair/typebox").TString;
    }>;
    camera: import("@sinclair/typebox").TObject<{
        front: import("@sinclair/typebox").TObject<{
            resolution: import("@sinclair/typebox").TString;
            features: import("@sinclair/typebox").TString;
        }>;
        back: import("@sinclair/typebox").TObject<{
            resolution: import("@sinclair/typebox").TString;
            features: import("@sinclair/typebox").TString;
        }>;
    }>;
    cpu: import("@sinclair/typebox").TObject<{
        cpu_name: import("@sinclair/typebox").TString;
        os: import("@sinclair/typebox").TString;
    }>;
    battery: import("@sinclair/typebox").TObject<{
        capacity: import("@sinclair/typebox").TString;
        charge_voltage: import("@sinclair/typebox").TString;
    }>;
}>;
export declare const PhoneTechnicalDetails: import("@sinclair/typebox").TObject<{
    product_id: import("@sinclair/typebox").TString;
    screen: import("@sinclair/typebox").TString;
    camera_front: import("@sinclair/typebox").TString;
    camera_back: import("@sinclair/typebox").TString;
    cpu: import("@sinclair/typebox").TString;
    battery: import("@sinclair/typebox").TString;
}>;
export declare const LaptopTechnicalDetails: import("@sinclair/typebox").TObject<{
    product_id: import("@sinclair/typebox").TString;
    screen: import("@sinclair/typebox").TString;
    cpu: import("@sinclair/typebox").TString;
    ram: import("@sinclair/typebox").TString;
    battery: import("@sinclair/typebox").TString;
    more: import("@sinclair/typebox").TString;
}>;
export declare const User: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    search_history: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    recommendations: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export declare const ProductsPaginated: import("@sinclair/typebox").TObject<{
    count: import("@sinclair/typebox").TNumber;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        image: import("@sinclair/typebox").TString;
        price: import("@sinclair/typebox").TString;
        brand: import("@sinclair/typebox").TString;
        description: import("@sinclair/typebox").TString;
        storage: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare const TechnicalDetailsPaginated: import("@sinclair/typebox").TObject<{
    count: import("@sinclair/typebox").TNumber;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        product_id: import("@sinclair/typebox").TString;
        screen: import("@sinclair/typebox").TObject<{
            size: import("@sinclair/typebox").TString;
            refresh_rate: import("@sinclair/typebox").TString;
        }>;
        camera: import("@sinclair/typebox").TObject<{
            front: import("@sinclair/typebox").TObject<{
                resolution: import("@sinclair/typebox").TString;
                features: import("@sinclair/typebox").TString;
            }>;
            back: import("@sinclair/typebox").TObject<{
                resolution: import("@sinclair/typebox").TString;
                features: import("@sinclair/typebox").TString;
            }>;
        }>;
        cpu: import("@sinclair/typebox").TObject<{
            cpu_name: import("@sinclair/typebox").TString;
            os: import("@sinclair/typebox").TString;
        }>;
        battery: import("@sinclair/typebox").TObject<{
            capacity: import("@sinclair/typebox").TString;
            charge_voltage: import("@sinclair/typebox").TString;
        }>;
    }>>;
}>;
