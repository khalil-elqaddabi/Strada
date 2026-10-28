import express from 'express';

const router = express.Router();

router.get("/testDep", (req, res) => { return res.send({message: "test departure route"})});

export default router;

