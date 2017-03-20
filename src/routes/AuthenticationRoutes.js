import express from 'express';
const router = express.Router();
import jwt from 'jwt-simple';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
