"use server";

import prisma from "./prisma";

export const getAllUnits = async () => {
  try {
    return await prisma.unit.findMany();
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
};

export const addUnit = async (data: { name: string; type: string; options?: string }) => {
  try {
    return await prisma.unit.create({
      data: {
        name: data.name,
        type: data.type,
        options: data.options || null,
      },
    });
  } catch (error) {
    console.error("Error adding unit:", error);
    throw error;
  }
};

export const updateUnit = async (
  id: number,
  data: { name: string; type: string; options?: string }
) => {
  try {
    return await prisma.unit.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        options: data.options || null,
      },
    });
  } catch (error) {
    console.error("Error updating unit:", error);
    throw error;
  }
};

export const deleteUnit = async (id: number) => {
  try {
    return await prisma.unit.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting unit:", error);
    throw error;
  }
};

export async function getUnitsByIds(unitIds: number[]) {
  return await prisma.unit.findMany({
    where: { id: { in: unitIds } },
  });
}

export async function getUnitsByPattern(patternId: number) {
  try {
    return await prisma.patternUnit.findMany({
      where: { patternId },
      select: {
        unit: {
          select: {
            id: true,
            name: true,
            type: true, // Fetching unit type
            options: true, // Fetching additional options if needed
          },
        },
        
      },
    });
  } catch (error) {
    console.error("Error fetching units by pattern:", error);
    return [];
  }
}

