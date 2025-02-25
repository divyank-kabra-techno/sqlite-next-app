import { openDB } from "./index";

const STORE_NAME = "designPatterns";

export async function addDesignPattern(pattern: { title: string; description: string }) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.add(pattern);
}

export async function getAllDesignPatterns(): Promise<{ id: number; title: string; description: string }[]> {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

export async function deleteDesignPattern(id: number) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
}

export async function updateDesignPattern(id: number, updatedData: any) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        const getRequest = store.get(id);
        getRequest.onsuccess = () => {
            const existingData = getRequest.result;
            if (!existingData) {
                reject("Design Pattern not found");
                return;
            }

            const updatedPattern = { ...existingData, ...updatedData };
            const putRequest = store.put(updatedPattern);

            putRequest.onsuccess = () => resolve("Design Pattern updated successfully");
            putRequest.onerror = () => reject("Failed to update design pattern");
        };

        getRequest.onerror = () => reject("Error fetching design pattern");
        tx.onerror = () => reject("Transaction failed");
    });
}
