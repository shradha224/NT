import { openDB } from 'idb';

const DB_NAME = 'navya-offline-db';
const DB_VERSION = 1;
const STORE_NAME = 'syncQueue';

export class SyncManager {
  constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });

    window.addEventListener('online', this.handleOnline.bind(this));
  }

  async enqueueRequest(url, method, body, headers = {}) {
    const db = await this.dbPromise;
    const request = {
      url,
      method,
      body,
      headers,
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    };
    
    await db.add(STORE_NAME, request);
    console.log('Request queued for offline sync:', request);
  }

  async handleOnline() {
    console.log('Network restored. Processing sync queue...');
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const requests = await store.getAll();

    for (const req of requests) {
      try {
        const response = await fetch(req.url, {
          method: req.method,
          headers: {
            'Content-Type': 'application/json',
            ...req.headers
          },
          body: JSON.stringify(req.body)
        });

        if (response.ok) {
          await store.delete(req.id);
          console.log(`Synced request ${req.id} successfully`);
        } else {
          console.error(`Failed to sync request ${req.id}:`, response.statusText);
        }
      } catch (err) {
        console.error(`Sync failed for request ${req.id}, will retry later`, err);
      }
    }
  }
}

export const syncManager = new SyncManager();
