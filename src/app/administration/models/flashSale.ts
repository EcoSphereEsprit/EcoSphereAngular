export interface FlashSale {
    _id?: string;
    product: string;
    price: number;
    discountPrice: number;
    startDate: Date;
    endDate: Date;
    image: Image;
}


interface Image {
    name: string;
    objectURL: string;
    file?: File
}
