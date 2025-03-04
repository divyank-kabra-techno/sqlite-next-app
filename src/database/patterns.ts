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
          unit: { connect: { id: unitId } }, // ✅ Create units records
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
    where: { id },
    data: {
      category_id: data.category_id,
      name: data.name,
      amount: data.amount,
      units: {
        set: data.units.map((unitId) => ({ id: unitId })), // Replace units
      },
    },
  });
}

export async function deletePattern(id: number) {
  return await prisma.pattern.delete({
    where: { id },
  });
}

export async function getAllCategories() {
  return await prisma.category.findMany(); // Fetch categories
}

export async function getAllUnitTypes() {
  return await prisma.unit.findMany(); // Fetch unit types
}
