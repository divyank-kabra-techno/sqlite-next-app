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