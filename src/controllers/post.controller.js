
const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const {v4:uuidv4} = require("uuid");

async function createPostController(req, res) {
    const file = req.file;
    console.log("File received in controller:", file);
const base64Image =  new Buffer.from(file.buffer).toString('base64');

const caption = await generateCaption(base64Image);
const result = await uploadFile(file.buffer , `${uuidv4()}-${file.originalname}`);

console.log("Generated caption:", caption);

res.json({ caption, imageUrl :result.url, });

const post = new postModel.create({
    caption:caption,
    imageUrl:result.url,
    userId:req.user._Id
})
     res.status(201).json({
        message: "Post created successfully",
        post:post
     })
}

module.exports = { createPostController };

