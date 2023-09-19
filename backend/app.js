require("dotenv").config();
const express = require("express");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const corsOptions = require("./config/corsOption");
const swaggerFile = require("./swagger_output.json");
const { dbConnection } = require("./config/_db");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const Notification = require("./models/notification/notification.model");
const { User } = require("./models/user/user.model");

// Create app

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(logger);
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json({ limit: "20mb" }));

// middleware for cookies
app.use(cookieParser());

// AUTH ROUTES
app.use("/auth", require("./routes/_user/auth.routes"));
app.use("/users/", require("./routes/_user/user.routes"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use(verifyJWT);

// APP ROUTES
app.use("/services", require("./routes/_services/service.routes"));
app.use("/projects", require("./routes/_projects/project.routes"));
app.use("/folders", require("./routes/_folders/folder.routes"));
app.post("/authenticate", require("./routes/_chat/chat.routes"));

app.get("/notifications/:id", async (req, res) => {
  try {
    const recipientId = req.params.id;
    const user = await User.findById(recipientId);
    const notifications = await Notification.find({
      recipients: user._id,
    }).populate("doer");
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.use("/send-email", require("./routes/_contact/contact.routes"));


app.use(
  "/project-categories",
  require("./routes/_projects/project_categories.routes")
);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  dbConnection();
});
