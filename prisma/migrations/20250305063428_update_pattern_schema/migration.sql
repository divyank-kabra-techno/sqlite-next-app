/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Pattern` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Pattern` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_Pattern" ("amount", "id", "name") SELECT "amount", "id", "name" FROM "Pattern";
DROP TABLE "Pattern";
ALTER TABLE "new_Pattern" RENAME TO "Pattern";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
