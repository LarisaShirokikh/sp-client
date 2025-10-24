import { GroupBuyStatus } from "./organizer";

export interface GroupBuy {
    id: number;
    title: string;
    description: string;
    category: string;
    supplier: string;
    min_order_amount: number;
    start_date: string;
    end_date: string;
    fee_percent: number;
    progress: number;
    allow_partial_purchase: boolean;
    is_visible: boolean;
    status: GroupBuyStatus | string;
    image?: string;
    organizer_id: number;
    created_at: string;
    updated_at: string;
    total_participants: number;
    total_amount: number;
    products_count: number;
    ordersCount?: number;
    deliveryTime?: string;
    deliveryLocation?: string;
    transportationCost?: number;
    participationTerms?: string;
    organizer?: Organizer;
    participants?: Participant[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    priceWithFee?: number;
    vendor: string | null;
    vendor_code: string | null;
    available: boolean;
    group_buy_id: number;
    created_at: string;
    updated_at: string;
    quantity_ordered: number;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    vendor: string | null;
    vendor_code: string | null;
    available: boolean;
}

export interface Participant {
    id: string;
    name: string;
    avatar?: string;
    quantity: number;
    amount: number;
    isPaid: boolean;
}

export interface Organizer {
    id: string;
    name: string;
    avatar?: string;
}