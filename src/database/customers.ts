"use server";

import prisma from "./prisma";


export async function getCustomers(searchQuery?: string) {
  return await prisma.customer.findMany({
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
  return await prisma.customer.create({
    data: customer,
  });
}

export async function deleteCustomer(customerId:number) {
    return await prisma.customer.delete({
      where: {
          id: customerId,
      },
    });
}

export async function getCustomerByMobile(mobile: string) {
  return await prisma.customer.findFirst({
    where: {
      mobile: mobile,
    },
  })
}