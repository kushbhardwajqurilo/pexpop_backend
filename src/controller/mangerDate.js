
const ManagerDateRecordModel = require("../model/mangerDate")

exports.addManagerDate = async (req, res) => {
    const { date, costing_inr } = req.body
    try {
        const dateData = await ManagerDateRecordModel.create({ date, costing_inr })
        if (dateData) {
            res.json({
                status: "success",
                message: "date added sucessfully",
                data: dateData,

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

exports.getAllManagerDate = async (req, res) => {
    try {
        const dateRecords = await ManagerDateRecordModel.find({}).sort({ date: -1 })
        if (dateRecords) {
            if (dateRecords.length > 0) {
                const updatedDateRecords = dateRecords.map((data) => {
                    const total_sale_usd = data.entries.reduce((total, entry) => total + entry.total_sale_usd, 0);
                    const total_sale_inr = data.entries.reduce((total, entry) => total + entry.total_sale_inr, 0);
                    const total_revenue = data.entries.reduce((total, entry) => total + entry.revenue, 0);
                

                  
                    const combined = {
                        total_sale_usd,
                        total_sale_inr,
                        total_revenue,
                       

                        total_pending_entries
                    }
                    data.combined = combined
                    return { id: data._id, date: data.date, costing_inr: data.costing_inr, ...combined, total_entries: data.entries.length }
                })
                res.json({
                    status: "success",
                    message: "date get sucessfully",
                    data: updatedDateRecords,

                })
            }
            else {
                updatedDateRecords = []
                res.json({
                    status: "success",
                    message: "No Entires Found",
                    data: updatedDateRecords,
                })
            }
            //   const totalINR = entries.reduce((total, entry) => total + entry.total_sale_inr, 0);
            //   const totalCosting = entries.reduce((total, entry) => total + entry.costing_inr, 0);
            //   const netProfit = entries.reduce((total, entry) => total + entry.profit, 0);
            //   console.log(totalUSD);
            //   const totalAgentCommission = entries.reduce((total, entry) => total + entry.total_sale_inr*entry.agent_commission/100, 0);






        }
        else {
            res.json({
                status: "failed",
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

exports.editManagerDate = async (req, res) => {
    const { costing_inr } = req.body
    const id = req.params.id
    try {
        const dateData = await ManagerDateRecordModel.findByIdAndUpdate(id, { costing_inr })
        if (dateData) {
            res.json({
                status: "success",
                message: "date updated sucessfully",
                data: dateData,

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

exports.searchManagerDate = async (req, res) => {
    const dataee = req.query

    try {
        const start = new Date(dataee.date).setHours(0, 0, 0, 0);
        const end = new Date(dataee.date).setHours(23, 59, 59, 999);

        const allEnteries = await ManagerDateRecordModel.find({ date: { $gte: start, $lte: end } })


        if (allEnteries) {
            res.json({
                status: "success",
                message: "date get sucessfully",
                data: allEnteries,

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

exports.getEntryByManagerDateRange = async (req, res) => {
    const data = req.query


    try {
        if (data.from == data.to) {
            data.from = new Date(data.from).setHours(0, 0, 0, 0);
            data.to = new Date(data.to).setHours(23, 59, 59, 999);
        }
        const dateRecords = await ManagerDateRecordModel.find({ date: { $gte: data.from, $lte: data.to } }).sort({ date: -1 })

        if (dateRecords.length > 0) {


            const updatedDateRecords = dateRecords.map((data) => {
                const total_sale_usd = data.entries.reduce((total, entry) => total + entry.total_sale_usd, 0);
                const total_sale_inr = data.entries.reduce((total, entry) => total + entry.total_sale_inr, 0);
                const total_revenue = data.entries.reduce((total, entry) => total + entry.revenue, 0);

                const total_pending_entries = data.entries.length > 0 ? data.entries.filter((entry) => entry.payment_status === "pending").length : 0;

                const combined = {
                    total_sale_usd,
                    total_sale_inr,
                    total_revenue,

                    total_pending_entries
                }
                data.combined = combined
                return { id: data._id, date: data.date, costing_inr: data.costing_inr, ...combined, total_entries: data.entries.length, }
            })
            res.json({
                status: "success",
                message: "user entry get sucessfully",
                data: updatedDateRecords,

            })
        }
        else {
            res.json({
                status: "not found",
                data: [],
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
exports.deleteManagerDate = async (req, res) => {
    const id = req.params.id
    try {
        const dateData = await ManagerDateRecordModel.deleteOne({ _id: id })
        if (dateData) {
            res.json({
                status: "success",
                message: "date deleted sucessfully",

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

exports.getDateByDateRangeFromTo = async (req, res) => {
    const data = req.query


    try {
        data.from = new Date(data.from).setHours(0, 0, 0, 0);
        data.to = new Date(data.to).setHours(23, 59, 59, 999);

        const allEnteries = await ManagerDateRecordModel.find({ createdAt: { $gte: data.from, $lte: data.to } })
        if (allEnteries.length > 0) {
            res.json({
                status: "success",
                message: "Date Get Sucessfully",
                data: allEnteries,

            })
        }
        else {
            res.json({
                status: "not found",
                data: [],
            })
        }
    }
    catch (error) {
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