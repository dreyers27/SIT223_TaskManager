const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let tasks = [
    { id: 1, title: "Study Jenkins", completed: false },
    { id: 2, title: "Finish SIT223 assignment", completed: true }
];

// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// Add a task
app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Task title is required" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Complete a task
app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.completed = true;

    res.json(task);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const taskExists = tasks.some(t => t.id === taskId);

    if (!taskExists) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks = tasks.filter(t => t.id !== taskId);

    res.json({ message: "Task deleted successfully" });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Task Manager running at http://localhost:${PORT}`);
    });
}

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "Task Manager"
    });
});

module.exports = app;