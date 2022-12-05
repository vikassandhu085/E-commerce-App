const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");

var session = require("express-session");

app.use(
  session({
    secret: "Alibaba-ecom",
    saveUnintialized: true,
    resave: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });
app.use(upload.single("image"));

app.use(express.static("ecom"));
app.use(express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

const db = require("./database");
db.init();

const homepage = require("./routes/admin/homepage");
app.use("/", homepage);

const signup = require("./routes/customer/signup");
app.use("/signup", signup);

const login = require("./routes/customer/login");
app.use("/login", login);

const load_more = require("./routes/customer/load-more");
app.use("/load-more", load_more);

const logout = require("./routes/customer/logout");
app.use("/logout", logout);

const verifyUser = require("./routes/customer/verifyUser");
app.use("/verifyUser", verifyUser);

const forgotPassword = require("./routes/customer/forgotPassword");
app.use("/forgotPassword", forgotPassword);

const changePassword = require("./routes/customer/changePassword");
app.use("/changePassword", changePassword);

const addToCart = require("./routes/customer/addToCart");
app.use("/addToCart", addToCart);

const showMyCart = require("./routes/customer/showMyCart");
app.use("/myCart", showMyCart);

const addProduct = require("./routes/admin/addProduct");
app.use("/addProduct", addProduct);

const deleteProduct = require("./routes/admin/deleteProduct");
app.use("/deleteProduct", deleteProduct);

const getUpdateProductId = require("./routes/admin/getUpdateProductId");
app.use("/updateProductId", getUpdateProductId);

const updateProduct = require("./routes/admin/updateProduct");
app.use("/updateProduct", updateProduct);

const addQuantity = require("./routes/customer/addQuantity");
app.use("/plusQuantity", addQuantity);

const minusQuantity = require("./routes/customer/minusQuantity");
app.use("/minusQuantity", minusQuantity);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
