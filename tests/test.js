const request = require("supertest");
const app = require("../app");

describe("Task Manager API", () => {

    test("GET /api/tasks returns the task list", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/tasks creates a new task", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Automated test task"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Automated test task");
        expect(response.body.completed).toBe(false);
    });

    test("PUT /api/tasks/:id completes a task", async () => {
        const response = await request(app)
            .put("/api/tasks/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    test("DELETE /api/tasks/:id deletes a task", async () => {
        const response = await request(app)
            .delete("/api/tasks/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Task deleted successfully");
    });

});