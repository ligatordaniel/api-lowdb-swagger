import { Handler } from "express";
import { nanoid } from "nanoid";
import { getConnection } from "../lowdb/lowdbConfig";

export const getUsers: Handler = (req, res) => {
  const data = getConnection().get("user").value();
  return res.json(data);
};

export const createUser: Handler = (req, res) => {
  const { name, description } = req.body;

  const newUser = { name, description, id: nanoid() };

  try {
    getConnection().get("users").push(newUser).write();
    res.json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) return res.status(404).json({ msg: "user was not found" });

  res.json(userFound);
};

export const countUser: Handler = (req, res) => {
  const userLength = getConnection().get("user").value().length;
  res.json(userLength);
};

export const deleteUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) {
    return res.status(404).json({ msg: "User was not found" });
  }

  const deletedUser = getConnection()
    .get("users")
    .remove({ id: req.params.id })
    .write();

  res.json(deletedUser);
};

export const updateUser: Handler = (req, res) => {
  try {
    const userFound = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .value();

    if (!userFound) {
      return res.status(404).json({ msg: "User was not found" });
    }

    const updatedUser = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};
