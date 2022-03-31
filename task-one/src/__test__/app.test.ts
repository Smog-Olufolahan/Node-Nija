import request from "supertest";
import app from "../app";

// interface Data {
//     organization: string,
//     createdAt ?: Date,
//     updatedAt ?: Date,
//     products: string[],
//     marketValue: string,
//     address: string,
//     ceo: string,
//     country: string,
//     id ?: number,
//     noOfEmployees:number,
//     employees:string[]
// };

const data = {
    organization: "node ninja",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
};

let id = "";
let length = 0;

describe("POST /", () => {
    it("should add the posted data to the database", async () => {
        const res = await request(app).post("/").send(data);
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("createdAt");
        id = res.body.data.id
    });

    it("should return an 400 status for invalid request", async () => {
        const res = await request(app).post("/").send({});
        expect(res.status).toBe(400);
    });
});

describe("GET /", () => {
    it("should return an array of data", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        length = res.body.data.length;
    });
});

describe("GET /:id", () => {
    it("should fetch a resource by id", async () => {
        const res = await request(app).get(`/${id}`);
        expect(res.status).toBe(200); 
        expect(res.body.data.id).toBe(parseInt(id));
    });

    it("should return an 400 status for invalid request", async () => {
        const id = 0;
        const res = await request(app).get(`/${id}`);
        expect(res.status).toBe(400);
    });

    it("should return an 404 status for item not found", async () => {
        const id = 500;
        const res = await request(app).get(`/${id}`);
        expect(res.status).toBe(404);
    });
});

describe("PUT /", () => {
    data.country = "Canada";

    it("should update the data with the specified id with the new info", async () => {
        const res = await request(app).put(`/${id}`).send(data);
        expect(res.status).toBe(200);
        expect(res.body.data.country).toBe("Canada");
    });

    it("should return an 404 status for item not found", async () => {
        const id = 500;
        const res = await request(app).put(`/${id}`);
        expect(res.status).toBe(404);
    });

    it("should return an 400 status for invalid request", async () => {
        const id = 0;
        const res = await request(app).put(`/${id}`);
        expect(res.status).toBe(400);
    });
});

describe("DELETE /", () => {
    it("should decrease the amount of resources in the database", async () => {
        const res = await request(app).delete(`/${id}`);
        const resAll = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(resAll.body.data.length).toBe(length - 1);

    });

    it("should return an 400 status for invalid request", async () => {
        const id = 0;
        const res = await request(app).delete(`/${id}`);
        expect(res.status).toBe(400);
    });

    it("should return an 404 status for item not found", async () => {
        const id = 500;
        const res = await request(app).delete(`/${id}`);
        expect(res.status).toBe(404);
    });
});