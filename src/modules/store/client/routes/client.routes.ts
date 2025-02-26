import { Router } from "express";

import ClientController from "../controllers/client.controller";
import { VerifyIdMiddleware } from "../../../../core/middlewares/verifyId.middleware";

class ClientRoutes {
    public readonly router: Router;

    private readonly controller: ClientController;

    constructor() {
        this.router = Router();
        this.controller = new ClientController();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        const { getAll, getById, createNew, updateById, deleteById } = this.controller;
        this.router.get("/", getAll.bind(this.controller));
        this.router.get("/:id", VerifyIdMiddleware.validate, getById.bind(this.controller));
        this.router.post("/", createNew.bind(this.controller));
        this.router.patch("/:id", VerifyIdMiddleware.validate, updateById.bind(this.controller));
        this.router.delete("/:id", VerifyIdMiddleware.validate, deleteById.bind(this.controller));
    }
}

export default ClientRoutes;
