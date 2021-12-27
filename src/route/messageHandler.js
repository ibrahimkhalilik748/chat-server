const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const messageSchema = require('../Schema/messageSchema');
const Message = new mongoose.model('Message', messageSchema);


//get all the Message
router.get('/',  async (req, res) => {
    await Message.find().select({ __v: 0 }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                data,
                message: "Get Successful",
            });
        }
    })
})

//get a Message by ID
router.get('/:id', async (req, res) => {
    await Message.find({ _id: req.params.id }).select({ __v: 0 }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else { 
            res.status(200).json({
                data: data,
                message: "Get Successful",
            });
        }
    })
})

//post Message
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save((err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Post Successful",
            });
        }
    });
})

//put Message
router.put('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            message.name = req.body.message;
            await message.save();
            res.status(200).send({
                message: 'success'
            });
        }
    } catch (err) {
        res.status(404).send({
            message: err.message,
        });
    }
})

//Delete Message
router.delete('/:id', async (req, res) => {
    await Message.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Delete Successful",
            });
        }
    })
})



module.exports = router;