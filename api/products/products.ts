import { CreateProduct, UpdateProduct } from "@/types/product";
import { axiosClient } from "../axiosClient";

// Nhân viên tạo sản phẩm mới 
export async function CreateProductAsync(productData: CreateProduct) {
    const formData = new FormData();

    formData.append("ProductID", productData.productID);
    formData.append("ProductName", productData.productName);
    formData.append("Category", productData.category);
    formData.append("Color", productData.color);
    formData.append("Pattern", productData.pattern);
    formData.append("SizeType", productData.sizeType);
    formData.append("CreatedBy", productData.createdBy);

    productData.quantities.forEach((quantity, index) => {
        formData.append(`Quantities[${index}].Size`, quantity.size);
        formData.append(`Quantities[${index}].Quantities`, quantity.quantities.toString());
    })

    if (productData.image) {
        formData.append("Image", productData.image);
    }

    const response = await axiosClient.post(
        "/product/create",
        formData,
        { 
            withCredentials: true,
        }
    );

    return response.data;
};

// Nhân viên cập nhật sản phẩm đã khai báo (chờ duyệt)
export async function UpdateProductAsync(productData: UpdateProduct) {
    const url = `/product/update/${productData.id}`;

    if (!productData.image) {
        const payload = {
            ProductID: productData.productID,
            ProductName: productData.productName,
            Category: productData.category,
            Color: productData.color,
            Pattern: productData.pattern,
            SizeType: productData.sizeType,
            CreatedBy: productData.createdBy,
            Quantities: productData.quantities.map((q) => ({ Size: q.size, Quantities: q.quantities })),
        };

        const response = await axiosClient.patch(url, payload, {
            withCredentials: true,
        });

        return response.data;
    }

    const formData = new FormData();

    formData.append("Id", productData.id);
    formData.append("ProductID", productData.productID);
    formData.append("ProductName", productData.productName);
    formData.append("Category", productData.category);
    formData.append("Color", productData.color);
    formData.append("Pattern", productData.pattern);
    formData.append("SizeType", productData.sizeType);
    formData.append("CreatedBy", productData.createdBy);

    productData.quantities.forEach((quantity, index) => {
        formData.append(`Quantities[${index}].Size`, quantity.size);
        formData.append(`Quantities[${index}].Quantities`, quantity.quantities.toString());
    });

    formData.append("Image", productData.image);

    const response = await axiosClient.patch(url, formData, {
        withCredentials: true,
    });

    return response.data;
};

// Lấy các sản phẩm có trạng thái pending của nhân viên đó
export async function GetPendingProducts() {
    const response = await axiosClient.get(
        "/product/pending",
        { withCredentials: true }
    );

    return response.data;
}