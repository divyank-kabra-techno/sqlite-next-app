"use server";

import prisma from "./prisma";

export async function getAllOrders() {
    return await prisma.order.findMany({
        include: {
            customer: true, // Fetch related customer
            orderDetails: {
                include: {
                    pattern: true,
                    units: true,
                },
            },
        },
    });
}

// Add New Order
export async function addOrder(data: {
    customerId: number;
    bookingDate: string;
    deliveryDate: string;
    status: string;
    orderItems: { patternId: number; units: { unitId: number; quantity: number }[] }[];
}) {
    return await prisma.order.create({
        data: {
            customerId: data.customerId,
            bookingDate: new Date(data.bookingDate),
            deliveryDate: new Date(data.deliveryDate),
            status: data.status,
            orderDetails: {
                create: data.orderItems.map((item) => ({
                    patternId: item.patternId,
                    units: {
                        create: item.units.map((unit) => ({
                            unitId: unit.unitId,
                            quantity: unit.quantity,
                        })),
                    },
                })),
            },
        },
    });
}
