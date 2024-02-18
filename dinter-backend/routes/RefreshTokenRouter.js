// const express = require('express')
// const router = express.Router()
// const UserController = require("../controllers/UserController")

import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';


router.get('/refresh-token', UserController.refreshToken)

export default router