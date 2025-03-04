/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patterns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "customers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "patterns";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "units";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" TEXT
);

-- CreateTable
CREATE TABLE "Pattern" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "units" TEXT NOT NULL,
    CONSTRAINT "Pattern_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "booking_date" DATETIME NOT NULL,
    "delivery_date" DATETIME NOT NULL,
    "total_amount" REAL NOT NULL,
    "paid_amount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL,
    CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "pattern_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "measurement" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "OrderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDetail_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "Pattern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "payment_mode" TEXT NOT NULL,
    CONSTRAINT "Transaction_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_mobile_key" ON "Customer"("mobile");
