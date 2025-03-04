/*
  Warnings:

  - You are about to drop the column `units` on the `Pattern` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PatternUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pattern_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    CONSTRAINT "PatternUnit_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "Pattern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatternUnit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pattern" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Pattern_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pattern" ("amount", "category_id", "id", "name") SELECT "amount", "category_id", "id", "name" FROM "Pattern";
DROP TABLE "Pattern";
ALTER TABLE "new_Pattern" RENAME TO "Pattern";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
