const dal = require("../data-access-layer/dal");

// Get all items: 
async function getAllItems() {
    const sql = "SELECT _id, title, completed FROM items ORDER BY completed";
    const items = await dal.executeAsync(sql);
    return items;
}

// Add new item: 
async function addItem(item) {
    const sql = `INSERT INTO items(title, completed) VALUES('${item.title}', ${item.completed})`;
    const info = await dal.executeAsync(sql); // info is an information object regarding the current operation
    item._id = info.insertId;
    return item;
}

// Update existing item: 
async function updateFullItem(item) {
    const sql = `UPDATE items SET title = '${item.title}', completed = ${item.completed}
    WHERE _id = ${item._id}`;
    const info = await dal.executeAsync(sql);
    
    return info.affectedRows === 0 ? null : item;
}

async function updatePartialItem(item) {
    let sql = "UPDATE items SET ";
    
    if(item.title !== undefined) {
        sql += `title = '${item.title}',`;
    }

    if(item.completed !== undefined) {
        sql += `completed = ${item.completed},`;
    }

    sql = sql.substr(0, sql.length - 1); //Remove last comma

    sql += ` WHERE _id = ${item._id}`;

    const info = await dal.executeAsync(sql);

    if(info.affectedRows) { // if there are affected rows - item has been found to be updated.
        return item;
    }

    return null; // no affected rows. no such item.
}

// Delete existing item: 
async function deleteItem(_id) {
    const sql = `DELETE FROM items WHERE _id = ${_id}`;
    await dal.executeAsync(sql);
}

module.exports = {
    getAllItems,
    addItem,
    updateFullItem,
    updatePartialItem,
    deleteItem,
};