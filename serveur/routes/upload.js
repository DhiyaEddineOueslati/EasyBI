import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import KPI from "../models/KPI.js";
import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";
import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {kpis, products, transactions} from "../data/data.js";
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, path.join(__dirname, '..', 'data'));
    },
    filename: function (req, file, cb) {

        if (file.originalname === 'data.js') {
            cb(null, file.originalname);
        } else {
            cb(new Error('Invalid file name. Please upload a file named "data.js".'), null);
        }
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);


     KPI.insertMany(kpis);
    Product.insertMany(products);
     Transaction.insertMany(transactions);


        res.status(200).json({ message: 'File uploaded successfully.' });

});

export default router;
