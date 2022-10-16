import * as SQLite from 'expo-sqlite';
import Place from '../models/places';

const db = SQLite.openDatabase('./data.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, address TEXT NOT NULL, description TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                // 'DROP TABLE IF EXISTS places;',
                [],
                () => {
                    console.log('Table created')
                    resolve();
                },
                (_, err) => {
                    console.log(err);
                    reject(err);
                }
            );

            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS images (
                    id INTEGER PRIMARY KEY NOT NULL,
                    place_id INTEGER NOT NULL,
                    uri TEXT NOT NULL,
                    FOREIGN KEY(place_id) REFERENCES places(id)
                    );`,
                // 'DROP TABLE IF EXISTS images;',
                [],
                () => {
                    console.log("Initialized database images")
                    resolve();
                },
                (_, err) => {
                    console.log("Error initializing database images")
                    reject(err);
                }
            );
        });
    });

    return promise;
}

export const insertPlace = (title, description, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (title, address, description, lat, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, address, description, lat, lng],
                (_, result) => {
                    console.log(result)
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

export const insertImage = (place_id, uri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO images (place_id, uri) VALUES (?, ?);`,
                [place_id, uri],
                (_, result) => {
                    console.log(result)
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

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM places;`,
                [],
                async (_, result) => {
                    const places = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const placeId = result.rows.item(i).id;
                        const placeTitle = result.rows.item(i).title;
                        const placeAddress = result.rows.item(i).address;
                        const placeDescription = result.rows.item(i).description;
                        const placeLat = result.rows.item(i).lat;
                        const placeLng = result.rows.item(i).lng;
                        
                        const thumbnail = await getThumbnail(placeId);
                            
                
                        places.push(new Place(placeId, placeTitle, placeAddress, placeDescription, thumbnail.uri, placeLat, placeLng));



                    }

                    resolve(places);

                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const getThumbnail = (place_id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM images WHERE place_id = ? LIMIT 1;`,
                [place_id],
                (_, result) => {
                    const images = result.rows.item(0);
                    resolve(images);

                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const fetchImages = (place_id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM images WHERE place_id = ? `,
                [place_id],
                (_, result) => {
                    const images = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        images.push(result.rows.item(i));
                    }
                    resolve(images);


                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}


