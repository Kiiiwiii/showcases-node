import { Db, InsertOneWriteOpResult } from "mongodb";

declare namespace TodoModule {
  interface TodoItem {
    text: string
    isCompleted: boolean
    completedAt: number
  }
}

declare namespace UserModule {
  interface User {
    name: string
    age: number
    location: string
  }
}

declare namespace DatabaseModule {
  interface Operation<T> {
    addItem: (db: Db, item: T) => Promise<InsertOneWriteOpResult>;
    getItems: (db: Db, options: Partial<T> | string) => Promise<any[]>;
    deleteItems: (db: Db, options: Partial<T> | string, deleteOne: boolean) => Promise<any>;
    updateItem: (db: Db, filter: Partial<T> | string, update: Partial<T>) => Promise<any>;
  }
}