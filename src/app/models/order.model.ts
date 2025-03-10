interface OrderProps { 
    customerId: number;
    bookingDate: string;
    deliveryDate: string;
    status: string;
    orderItems: [pattern]
}

interface pattern {
    patternId : number,
    patternName : string,
    units:[orderPatternUnit]
}

interface orderPatternUnit {
    quantity:string|number,
    unitName:string,
    unitId:number
}
export interface selectedCategoryProps {
    id:number,
    name:string,
}
export interface selectedPatternProps {
    pattern_id:number,
    pattern_name:string,
    amount:number
}
export interface unitProps {
    id:number,
    name:string,
    type:string,
    quantity:string
}