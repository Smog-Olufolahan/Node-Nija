import express from "express";
import controller from "./controller";

const {getAll, getOne, post, put, removed} = controller();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", async (req, res) => await getAll(req, res));
app.get("/:id", async (req, res) => await getOne(req, res));
app.post("/", async (req, res) => await post(req, res));
app.put("/:id", async (req, res) => await put(req, res));
app.delete("/:id", async (req, res) => await removed(req, res));

export default app;