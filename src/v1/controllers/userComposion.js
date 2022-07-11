const { UserCompositions } = require('../models').default
const Composion = (socket_io) => {

    // this function expects a socket_io connection as argument
    console.log("Client Connected!!!")

    // Client Connect 
    socket_io.on('NewComposion', async function (data) {

        const finalData = {
            "id": "",
            "Metadata": data,
            "UserId": "",
        }
        if (finalData.id == "") {
            const user = await UserCompositions.create({
                Metadata: data
            })
            console.log("hellojkj")
        }
        else {
            const payload = {
                "Metadata": data
            }
            await UserCompositions.updateOne({ "_id": finalData.id }, payload)
        }

        socket_io.emit('NewComposion', data)

    });

}

module.exports = {
    Composion
}