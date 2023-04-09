const express = require("express");
const toDosLogic = require("../business-logic/toDos-logic");
const Item = require("../models/item");

const router = express.Router();

// GET all toTos - http://localhost:3000/api/items
router.get("/", async (request, response) => {
    try {
        const items = await toDosLogic.getAllItems();
        response.json(items);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST item - http://localhost:3000/api/items
router.post("/", async (request, response) => {
    try {
        const item = new Item(undefined, request.body.title, request.body.completed);

        // Validate item data: 
        const errors = item.validatePostOrPut();
        if(errors) {
            response.status(400).send(errors);
            return;
        }

        const addedItem = await toDosLogic.addItem(item);
        response.status(201).json(addedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT item - http://localhost:3000/api/items/7
router.put("/:_id", async (request, response) => {
    try {
        const _id = +request.params._id;
        const item = new Item(_id, request.body.title, request.body.completed);

        // Validate item data: 
        const errors = item.validatePostOrPut();
        if(errors) {
            response.status(400).send(errors);
            return;
        }

        const updatedItem = await toDosLogic.updateFullItem(item);
        if (!updatedItem) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH item - http://localhost:3000/api/items/7
router.patch("/:_id", async (request, response) => {
    try {
        const _id = +request.params._id;
        const item = new Item(_id, request.body.title, request.body.completed);

        // Validate item data: 
        const errors = item.validatePatch();
        if(errors) {
            response.status(400).send(errors);
            return;
        }

        const updatedItem = await toDosLogic.updatePartialItem(item);
        if (!updatedItem) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE item - http://localhost:3000/api/items/7
router.delete("/:_id", async (request, response) => {
    try {
        const _id = +request.params._id;
        await toDosLogic.deleteItem(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

