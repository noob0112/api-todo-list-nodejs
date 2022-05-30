const { vAPI } = require("../configs")

module.exports = (app, route, ctrl)=>{
    app.use(`/api/v${vAPI}${route}`, ctrl)
}