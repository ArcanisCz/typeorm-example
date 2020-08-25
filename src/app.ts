import {Request, Response} from "express";
import express from "express";

// create and setup express app
const app = express();
app.use(express.json());

// register routes

app.get("/users", function(req: Request, res: Response) {
    // here we will have logic to return all users
    console.log("usersa")
});

app.get("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to return user by id
});

app.post("/users", function(req: Request, res: Response) {
    // here we will have logic to save a user
});

app.put("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
});

app.delete("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
});

// start express server
app.listen(3000);
