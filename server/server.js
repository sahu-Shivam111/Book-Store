const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const User = require('./models/User')
const verifyToken = require("./middleware/verifyToken");
const admin = require("./middleware/admin");
const upload=require("./middleware/upload");
const Order = require("./models/Order");


require("dotenv").config();
const app = express()

app.use(express.json())

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend-domain.vercel.app"
    ],
    credentials: true
}));

const path = require("path");
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("succefully connected")
    })
    .catch((err) => {
        console.log("Error", err);
    })

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

app.get("/books/:id", async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({

                message: "Book Not Found"

            });

        }

        res.status(200).json(book);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

app.post('/books', verifyToken,admin,upload.single("image"), async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file?.filename

        })
        await book.save();
        res.status(201).json({
            message: "Book Added Successfully",
            book: book
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

})

app.put('/books/:id', verifyToken,admin, upload.single("image"),async (req, res) => {

    try {
         const data = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description
        };

        if (req.file) {
            data.image = req.file.filename;
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        )
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }
        res.status(200).json({
            message: "Book has updated",
            book: book
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

app.delete('/books/:id', verifyToken,admin, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)

        if (!book) {
            return res.status(404).json({
                message: "NOT FOUND"
            })
        }
        res.status(200).json({
            message: "Succesfully Deleted",
            book: book
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


app.post('/register', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.body.email
            }
        )
        if (user) {
            return res.status(400).json({
                message: "User has already registerd"
            })
        }
        const hashcode = await bcrypt.hash(
            req.body.password,
            10
        )

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashcode,
            role:"user"
        })
        await newUser.save();

        res.status(201).json({
            message: "Succesfully Created"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


app.post('/login', async (req, res) => {
    try {

        const user = await User.findOne(
            {
                email: req.body.email
            }

        )
        if (!user) {
            return res.status(404).json(

                {
                    message: "User Not Found"
                }
            )
        }
        const result = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!result) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }

        )

       res.status(200).json({
    message: "Login Successful",
    token: token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.get('/profile', verifyToken, (req, res) => {
    res.json(req.user)
})


//order



app.post("/orders", verifyToken, async (req, res) => {

    try {

        const order = new Order({

            userId: req.user.id,

            bookId: req.body.bookId,

            fullname: req.body.fullname,

            phone: req.body.phone,

            address: req.body.address,

            city: req.body.city,

            state: req.body.state,

            pincode: req.body.pincode,

            paymentMethod: req.body.paymentMethod

        });

        await order.save();

        res.status(201).json({

            message: "Order Placed Successfully",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

app.get("/orders", verifyToken, async (req, res) => {

    try {

        const orders = await Order.find({

            userId: req.user.id

        })

        .populate("bookId")

        .sort({

            createdAt: -1

        });

        res.status(200).json(orders);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

app.get("/admin/orders", verifyToken, admin, async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("userId")

            .populate("bookId")

            .sort({

                createdAt: -1

            });

        res.status(200).json(orders);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

app.put("/orders/:id", verifyToken, admin, async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        res.json({

            message: "Order Updated",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

app.listen(process.env.PORT, () => {
    console.log("Server is running ")
});