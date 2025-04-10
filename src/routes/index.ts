import { Router } from "express";
import { request,response } from "express";

const router = Router();
//Rutas
router.get("/", (req, res) => {
    res.send("Hello, world-GET!");
});
router.post("/", (req, res) => {
    res.send("Hello, world-POST!");
});
router.put("/", (req, res) => {
    res.send("Hello, world-PUT!");
});
router.delete("/", (req, res) => {
    res.send("Hello, world-DELETE!");
});


export default router;
