import { openDB } from "./index";

export async function addUnitType(unit: { name: string; status: string }) {
    const db = await openDB();
    const tx = db.transaction("units", "readwrite");
    const store = tx.objectStore("units");
    await store.add(unit);
}

export async function getAllUnitTypes(): Promise<{ id: number; name: string; status: string }[]> {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction("units", "readonly");
        const store = tx.objectStore("units");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

export async function deleteUnitType(id: number) {
    const db = await openDB();
    const tx = db.transaction("units", "readwrite");
    const store = tx.objectStore("units");
    await store.delete(id);
}

export async function getUnitsByIds(unitIds: number[]): Promise<selectedUnitResponse[]> {
    const db = await openDB();
    const tx = db.transaction("units", "readonly");
    const store = tx.objectStore("units");

    const units = await Promise.all(
        unitIds.map(async (id) => {
            return new Promise((resolve) => {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result || null);
            });
        })
    );

    // **Fix**: Ensure the response is properly typed and removes empty or undefined values
    return units.filter((unit): unit is selectedUnitResponse =>
        unit !== null && unit !== undefined && Object.keys(unit).length > 0
    );
}

