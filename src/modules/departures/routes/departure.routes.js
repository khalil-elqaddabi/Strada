import express from 'express';

const router = express.Router();

router.get("/", (req, res, next) => {
    req.container.resolve('departureController').getAll(req, res, next)
});

router.get("/:id", (req, res, next) => {
    req.container.resolve('departureController').getById(req, res, next)
});


router.post("/",(req, res, next) => {
    req.container.resolve("departureValidator").validateCreate(req, res, next)
} ,(req, res, next) => {
    req.container.resolve('departureController').create(req, res, next)
});

router.put("/:id",(req, res, next) => {
    req.container.resolve("departueValidator").validateUpdate(req, res, next)
}, (req, res, next) => {
    req.container.resolve('departureController').update(req, res, next)
});

router.delete("/:id", (req, res, next) => {
    req.container.resolve('departureController').delete(req, res, next)
});

// router.post("/",  controller.create);

export default router;

