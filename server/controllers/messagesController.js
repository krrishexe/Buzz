const MessageModel = require('../models/Message.model');
// const Messages = require('../models/Message.model')

module.exports.addMessage = async (req, res, next) => {

    try {
        const { from, to, message } = req.body;
        if (!from || !to || !message) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        const data = await MessageModel.create({
            message: {
                text: message,
                users: [from, to],
                sender: from,
            },
        })
        if (data) {
            // console.log(data)
            return res.json({ msg: 'Message created successfully' })
        }
        return res.json({ msg: 'Failed to add message' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal Server Error' });
        next(error)
    }

}

module.exports.getAllMessage = async (req, res, next) => {
    try {
        console.log(req.body)
        const { from, to } = req.body;
        const allMessages = await MessageModel.find({
            // message: {
            //     users: [
            //         $all: [from, to]
            //     ]
            // }
        }
        ).exec()
        let filteredMessages = []
        for (let msg of allMessages) {
            // console.log(Array.from(msg.message.users))
            let users = Array.from(msg.message.users)
            if (users[0] === from) {
                if (users[1] === to) {
                    // console.log("helo")
                    filteredMessages.push(msg)
                }
            } else if (users[0] === to) {
                if (users[1] === from) {
                    filteredMessages.push(msg)
                }
            }
        }
        // console.log(filteredMessages)

        const projectedMessages = filteredMessages.map((msg) => {
            return {
                fromSelf: msg.message.sender.toString() === from,
                message: msg.message.text,
            }
        })
        console.log(projectedMessages)
        res.json(projectedMessages)

    } catch (error) {
        console.log(error)
        next(error)
    }
}