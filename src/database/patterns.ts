"use server";

import prisma from "./prisma";// Ensure your Prisma client is properly configured

export async function getAllPatterns() {
  return await prisma.pattern.findMany({
    include: {
      category: true,
      units: {
        include: {
          unit: true,
        },
      },
    },
  });
}

export async function addPattern(data: {
  category_id: number;
  name: string;
  amount: number;
  units: number[];
}) {
  return await prisma.pattern.create({
    data: {
      category_id: data.category_id,
      name: data.name,
      amount: Number(data.amount),
      units: {
        create: data.units.map((unitId) => ({
          unit: { connect: { id: unitId } }, // ✅ Links existing units
        })),
      },
    },
    include: {
      units: {
        include: {
          unit: true,
        },
      },
    },
  });

}

export async function updatePattern(id: number, data: {
  category_id: number;
  name: string;
  amount: number;
  units: number[];
}) {
  return await prisma.pattern.update({
    where: { id: id },
    data: {
      category_id: data.category_id,
      name: data.name,
      amount: Number(data.amount),
      units: {
        deleteMany: {},
        create: data.units.map((unitId) => ({
          unit: { connect: { id: unitId } }, 
        })),
      },
    },
    include: {
      units: {
        include: {
          unit: true,
        },
      },
    },
  });
}


export async function deletePattern(id: number) {
  return await prisma.pattern.delete({
    where: { id },
  });
}

export async function getPatternsByCategory(categoryId: number) {
  try {
    return await prisma.pattern.findMany({
      where: { category_id:categoryId },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Error fetching patterns by category:", error);
    return [];
  }
}

