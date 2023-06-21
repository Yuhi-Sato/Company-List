export interface Company{
    id: string;
    companycode: string;
    status: string;
    name1: string;
    name2: string;
    postcode: string;
    representative1: string;
    representative2: string;
    phone: string;
    email: string;
    sales1: number;
    revenues1: number;
    sales2: number;
    revenues2: number;
    sales3: number;
    revenues3: number;
    created_at: string;
    updated_at: string;
    location: string;
}

export interface Account{
    id: string;
    year: string;
    companycode: string;
    sales: number;
    revenues: number;
}

export interface Info{
    id: string;
    companycode: string;
    status: string;
    name1: string;
    name2: string;
    postcode: string;
    representative1: string;
    representative2: string;
    phone: string;
    email: string;
    sales1: number;
    revenues1: number;
    sales2: number;
    revenues2: number;
    sales3: number;
    revenues3: number;
    created_at: string;
    updated_at: string;
    location: string;
    company_id: string;
    year: string;
    sales: number;
    revenues: number;
}