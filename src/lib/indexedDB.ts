import { openDB } from "idb";

const DB_NAME = "CustomerDB";
const STORE_NAME = "customers";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addCustomer(customer: { name: string; mobile: string }) {
  const db = await initDB();
  return db.put(STORE_NAME, { id: Date.now(), ...customer });
}

export async function getCustomers() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteCustomer(id: number) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
