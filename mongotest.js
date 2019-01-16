printjson(db.adminCommand('listDatabases'));
db = db.getSiblingDB('test');
printjson(db.getCollectionNames());
cursor = db.tables.find();
while (cursor.hasNext()){
    printjson(cursor.next());
}