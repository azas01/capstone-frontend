export interface ProductQuantity {
    size: string;
    quantities: number
}

export interface CreateProduct {
    productID: string,
    productName: string,
    category: string,
    color: string,
    pattern: string,
    sizeType: "Letter" | "Number",
    quantities: ProductQuantity[],
    createdBy: string,
    image: File | null
}

export interface Product {
    id: string,
    productID: string,
    productName: string,
    category: string,
    color: string,
    pattern: string,
    sizeType: "Letter" | "Number",
    quantities: ProductQuantity[],
    createdBy: string,
    createdAt: string,
    status: "Pending" | "Approved" | "Sending",
    imageUrl: string
}