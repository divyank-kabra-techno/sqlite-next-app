/*
  Warnings:

  - You are about to drop the `OrderDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `booking_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paid_amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `Order` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "patternId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "units" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "Pattern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "bookingDate" DATETIME NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "totalAmount" REAL NOT NULL,
    "paidAmount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "status") SELECT "id", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
