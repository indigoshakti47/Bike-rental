import app from "./app.js";
import './database.js';
console.log(app.get("port"))
app.listen(app.get("port"));

console.log("Server on port", app.get('port'));
