"use strict";

const router = require('express').Router();
const Utils = require('@utils');
const DBBlocks = require("@DBcore").blocks;
const DBCategories = require("@DBcore").categories;

const passport = require('passport');
const config = require('@config');
let tools = {};

router.route('/')
/**
 * get all defined blocks
 */
    .get(async (req, res, next) => {
        //get all categories
        let categories = await DBCategories.get.all();
        categories = categories.map(c => c.info())

        console.log(categories.map(c => c.name));

        //get all blocks with categories
        let blocks = await Promise.all(categories.map(category => {
            return DBBlocks.get.byCategory(category.name)
        }))
        //add blocks to categories
        blocks.forEach((b, i) => categories[i].blocks = b);
        console.log(categories)
        res.json({success: true, items: categories})
    })

module.exports = router;