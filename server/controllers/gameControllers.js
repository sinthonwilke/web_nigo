const asyncHandler = require('express-async-handler');
const gameSchema = require('../models/gameModel');
const fs = require('fs');


const getGames = asyncHandler(async (req, res) => {
    const games = await gameSchema.find();
    res.status(200).json(games);
});

const getGame = asyncHandler(async (req, res) => {
    const game = await gameSchema.findById(req.params.reqId);
    res.status(200).json(game);
});

const createGame = asyncHandler(async (req, res) => {
    const { title, releaseDate, description, platform, link, tags } = req.body;
    const newGame = await gameSchema.create({
        title,
        releaseDate,
        description,
        platform,
        link,
        tags,
        imgUrl: req.file ? req.file.path : ''
    });

    res.status(201).send('created');
});


const updateGame = asyncHandler(async (req, res) => {
    const { title, releaseDate, description, platform, link, tags } = req.body;
    const updateFields = {
        title,
        releaseDate,
        description,
        platform,
        link,
        tags
    };
    if (req.file) {
        const oldImgUrl = await gameSchema.findById(req.params.reqId);
        deleteImg(oldImgUrl.imgUrl);
        updateFields.imgUrl = req.file.path;
    }
    const updatedGame = await gameSchema.findByIdAndUpdate(req.params.reqId, updateFields);
    res.status(200).send('updated');
});

const deleteGame = asyncHandler(async (req, res) => {
    const deleteGame = await gameSchema.findById(req.params.reqId);
    deleteImg(deleteGame.imgUrl);
    await gameSchema.findByIdAndDelete(deleteGame._id);
    res.status(200).send('deleted');
});

function deleteImg(url) {
    if (url === '') return;
    fs.unlink(url, (err) => {
        if (err) {
            console.log(err);
        }
    });
};


module.exports = {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
};