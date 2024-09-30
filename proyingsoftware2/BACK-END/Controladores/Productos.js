import express from "express";


const router = express.Router();

router.get('/productoAll', (req, res) => {
    res.json(productos); 
});

export default router;