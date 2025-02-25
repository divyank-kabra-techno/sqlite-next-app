export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myAppDB", 1);

    request.onupgradeneeded = (event:any) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create stores if they don't exist
      if (!db.objectStoreNames.contains("units")) {
        db.createObjectStore("units", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("customers")) {
        const customerStore = db.createObjectStore("customers", { keyPath: "id", autoIncrement: true });
        customerStore.createIndex("mobile", "mobile", { unique: true });
      } else {
        const customerStore = event.target.transaction.objectStore("customers");
        if (!customerStore.indexNames.contains("mobile")) {
          customerStore.createIndex("mobile", "mobile", { unique: true });
        }
      }
      if (!db.objectStoreNames.contains("designPatterns")) {
        db.createObjectStore("designPatterns", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("orders")) {
        db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error opening IndexedDB");
  });
}
