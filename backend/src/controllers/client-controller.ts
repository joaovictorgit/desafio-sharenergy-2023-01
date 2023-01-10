import { Request, Response } from "express";
import { Client } from "interfaces/client";

const clientModel = require("../models/client-model");

const ClientController = {
  createClient: createClient,
  showAllClients: showAllClients,
  showClientByName: showClientByName,
  updateById: updateById,
  deleteById: deleteById,
};

async function createClient(request: Request, response: Response) {
  try {
    const clientRequest = request.body;

    const client: Client = {
      name: clientRequest.name,
      email: clientRequest.email,
      phone: clientRequest.phone,
      address: clientRequest.address,
      cpf: clientRequest.cpf,
    };

    const clientDb = new clientModel(client);
    const clientSave = await clientDb.save();

    return response.status(200).json(clientSave);
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

async function showAllClients(request: Request, response: Response) {
  try {
    const clients: [Client] = await clientModel.find();

    return response.status(200).json(clients);
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

async function showClientByName(request: Request, response: Response) {
  try {
    const name = request.params.name;
    const client = await clientModel.findOne({ name: name }).exec();

    return response.status(200).json(client);
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

async function updateById(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const clientRequest = request.body;

    const updateClient = await clientModel.findByIdAndUpdate(id, clientRequest);

    return response.status(200).json(updateClient);
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

async function deleteById(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const deleteClient = await clientModel.findByIdAndDelete(id);

    if (!deleteClient) {
      return response.status(400).json("Client has already been deleted!");
    }

    return response.status(200).json("Client deleted!");
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

export default ClientController;
