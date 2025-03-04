"use server";

import prisma from "./prisma";

export async function getAllCategories(searchQuery?: string) {
    return await prisma.category.findMany({
      where:searchQuery?
      {
          OR:[
              { name: { contains: searchQuery, mode: "insensitive" } },
          ]
      }:{},
      orderBy: {
          id: "desc",
      },
    });
}

export async function addCategory(category: { name: string; mobile: string }) {
    return await prisma.category.create({
      data: category,
    });
}