import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transactionObject) => {
      transactionObject.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        (_) => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transactionObject) => {
      transactionObject.executeSql(
        //don't use `` because it is insecure
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transactionObject) => {
      transactionObject.executeSql(
        //don't use `` because it is insecure
        'SELECT * FROM places',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}
