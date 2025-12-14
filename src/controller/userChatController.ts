import { Request, Response } from "express";
import geminiClient from "../lib/geminiClient";

const history = []
export const userChatController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { question } = req.body || {};
        

        history.push({
            role: "user",
            parts: [{ text: question }],
        })

        console.log("START========> ", JSON.stringify(history))

        const chat = geminiClient.chats.create({
            model: "gemini-2.5-flash",
            history: history
        });


        const response = await chat.sendMessage({
            message: question
        });

        history.push({
            role: "model",
            parts: [{ text: response.text }],
        })

        console.log("END---------->", JSON.stringify(history))


        res.status(200).json({
            status: "success",
            data: {
                reply: response.text,
            },
        });


    } catch (err) {
        console.error("Error in userChatController.main:", err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

export default { userChatController };
