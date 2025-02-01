function status(req, res) {
    res.status(200).json({ key: "API running" })
}

export default status