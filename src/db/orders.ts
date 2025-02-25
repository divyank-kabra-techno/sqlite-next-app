import { openDB } from "./index";

export async function addOrder(order: OrderProps ) {
    const db = await openDB();
    const tx = db.transaction("orders", "readwrite");
    const store = tx.objectStore("orders");
    await store.add(order);
}

export async function getAllOrders() {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction("orders", "readonly");
        const store = tx.objectStore("orders");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

export async function getOrderById(orderId: number) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("orders", "readonly");
        const store = tx.objectStore("orders");
        const request = store.get(orderId);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject("Order not found");
    });
}

export async function updateOrder(orderId: number, updatedData: any) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("orders", "readwrite");
        const store = tx.objectStore("orders");
        const getRequest = store.get(orderId);

        getRequest.onsuccess = () => {
            const existingOrder = getRequest.result;
            if (!existingOrder) {
                reject("Order not found");
                return;
            }
            const updatedOrder = { ...existingOrder, ...updatedData };
            const putRequest = store.put(updatedOrder);

            putRequest.onsuccess = () => resolve("Order updated successfully");
            putRequest.onerror = () => reject("Failed to update order");
        };

        getRequest.onerror = () => reject("Error fetching order");
    });
}

export async function deleteOrder(orderId: number) {
    const db = await openDB();
    const tx = db.transaction("orders", "readwrite");
    const store = tx.objectStore("orders");
    await store.delete(orderId);
}
