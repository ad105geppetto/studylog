import express from "express";

import dropoutRouter from "./Dropout";

////////////////////////////////////////////////////
const router = express.Router();

///////////////////////////////////////////////////

router.use("/dropout", dropoutRouter);

export default router;
