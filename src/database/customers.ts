"use server";

import prisma from "./prisma";


export async function getCustomers(searchQuery?: string) {
  return await prisma.customers.findMany({
    where:searchQuery?
    {
        OR:[
            { name: { contains: searchQuery, mode: "insensitive" } },
            { mobile: { contains: searchQuery, mode: "insensitive" } },
        ]
    }:{},
    orderBy: {
        id: "desc",
    },
  });
}

export async function addCustomer(customer: { name: string; mobile: string }) {
  return await prisma.customers.create({
    data: customer,
  });
}

export async function deleteCustomer(customerId:number) {
    return await prisma.customers.delete({
        where: {
            id: customerId,
        },
    });
}