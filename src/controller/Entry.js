const DateRecordModel = require("../model/Date");
const UserEntryModel = require("../model/Entry")

exports.addUserEntry = async (req, res) => {
    try {
        const data = req.body


        const from = new Date(data.date).setHours(0, 0, 0, 0);
        const to = new Date(data.date).setHours(23, 59, 59, 999);


        const dateRecord = await DateRecordModel.findOne({ date: { $gte: from, $lte: to } })
        if (dateRecord) {
            const total_sale_inr = (data.sale1) * data.rate1 + (data.sale2) * data.rate2 + (data.sale3) * data.rate3
            const usd = data.sale1 + data.sale2 + data.sale3
            const userEntry = {
                name: data.name,
                sale1: data.sale1 ?? 0,
                rate1: data.rate1 ?? 0,
                sale2: data.sale2 ?? 0,
                rate2: data.rate2 ?? 0,
                sale3: data.sale3 ?? 0,
                rate3: data.rate3 ?? 0,
                total_sale_usd: usd,
                total_sale_inr: total_sale_inr,
                agent_commission: data.agent_commission,
                revenue: parseInt(total_sale_inr - data.agent_commission * usd),
                payment_status: data.payment_status,
                agent_commission_inr: parseInt(data.agent_commission * usd),
                date: new Date(data.date),
                payment_status: data.payment_status,
            }
            dateRecord.entries.push(userEntry)
            await dateRecord.save();
            res.json({
                status: "success",
                message: "Entry added sucessfully",


            })
        }
        else {
            res.json({
                status: "fail",
                message: "Date not found"
            })
        }



    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}


exports.updateUserEntry = async (req, res) => {

    const data = req.body

    const entry_id = req.params.name


    try {

        const from = new Date(data.date).setHours(0, 0, 0, 0);
        const to = new Date(data.date).setHours(23, 59, 59, 999);

        const dateRecord = await DateRecordModel.findOne({ date: { $gte: from, $lte: to } })

        const Index = dateRecord.entries.findIndex((entry) => entry._id.toString() === entry_id)

        const total_sale_inr = (data.sale1) * data.rate1 + (data.sale2) * data.rate2 + (data.sale3) * data.rate3
        const usd = data.sale1 + data.sale2 + data.sale3
        const updateData = {
            name: data.name,
            sale1: data.sale1 ?? 0,
            rate1: data.rate1 ?? 0,
            sale2: data.sale2 ?? 0,
            rate2: data.rate2 ?? 0,
            sale3: data.sale3 ?? 0,
            rate3: data.rate3 ?? 0,
            total_sale_usd: usd,
            total_sale_inr: total_sale_inr,
            agent_commission: data.agent_commission,
            revenue: parseInt(total_sale_inr - data.agent_commission * usd),
            payment_status: data.payment_status,
            agent_commission_inr: parseInt(data.agent_commission * usd),
            date: new Date(data.date),
            payment_status: data.payment_status,
        }


        dateRecord.entries[Index] = updateData
        await dateRecord.save()



        if (dateRecord) {

            res.json({
                status: "success",
                message: "Entry updated sucessfully",
                data: dateRecord,

            })
        }
        else {
            res.json({
                status: "fail",
            })
        }
    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}

exports.deleteUserEntry = async (req, res) => {
    const entry_id = req.params.entry_id

    const date = req.body.date

    try {

        const from = new Date(date).setHours(0, 0, 0, 0);
        const to = new Date(date).setHours(23, 59, 59, 999);

        const dateRecord = await DateRecordModel.findOne({ date: { $gte: from, $lte: to } })

        const Index = dateRecord.entries.findIndex((entry) => entry._id.toString() == entry_id)
        dateRecord.entries.splice(Index, 1)


        await dateRecord.save()

        if (dateRecord) {
            res.json({
                status: "success",
                message: "Entry deleted sucessfully",
                data: dateRecord,

            })
        }
        else {
            res.json({
                status: "fail",
            })
        }
    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }

}

exports.searchUserEntry = async (req, res) => {
    const data = req.query.search
    console.log(data)

    try {
        const ress = await UserEntryModel.find({ name: { $regex: new RegExp(data, "i") } })
        console.log(ress)


        if (ress) {
            res.json({
                status: "success",
                message: "user entry search sucessfully",
                data: ress,

            })
        }
        else {
            res.json({
                status: "fail",
            })
        }
    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}
exports.getAllUserEntry = async (req, res) => {
    try {
        const allEnteries = await UserEntryModel.find({}).sort({ date: -1 })
        if (allEnteries) {
            res.json({
                status: "success",
                message: "user entry get sucessfully",
                data: allEnteries,

            })
        }
        else {
            res.json({
                status: "not found",
            })
        }

    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }

}







exports.getSingleEDate = async (req, res) => {
    const data = req.query

    const start = new Date(data.date).setHours(0, 0, 0, 0);
    const end = new Date(data.date).setHours(23, 59, 59, 999);

    try {

        const dateRecord = await DateRecordModel.findOne({ date: { $gte: start, $lte: end } })






        if (dateRecord) {
            res.json({
                status: "success",
                message: "user entry get sucessfully",
                dateRecord: dateRecord,
            })
        }
        else {
            res.json({
                status: "failure",
                message: "Entries not found"
            })
        }
    } catch (error) {
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}

