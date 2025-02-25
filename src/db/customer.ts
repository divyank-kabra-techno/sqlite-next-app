import { openDB } from "./index";

export async function addCustomer(customer: { name: string; mobile: string }) {
    const db = await openDB();
    const tx = db.transaction("customers", "readwrite");
    const store = tx.objectStore("customers");
    await store.add(customer);
}

export async function getCustomers(): Promise<{ id: number; name: string; mobile: string }[]> {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction("customers", "readonly");
        const store = tx.objectStore("customers");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

export async function deleteCustomer(id: number) {
    const db = await openDB();
    const tx = db.transaction("customers", "readwrite");
    const store = tx.objectStore("customers");
    await store.delete(id);
}

export async function getCustomerByMobile(mobile: string) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction("customers", "readonly");
        const store = tx.objectStore("customers");

        if (!store.indexNames.contains("mobile")) {
            reject("Index 'mobile' not found in 'customers' store");
            return;
        }

        const index = store.index("mobile");
        const request = index.get(mobile);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject("Error fetching customer by mobile");
    });
}