const router = require("express").Router();
const User = require("../Models/userModel");
const CryptoJS = require("crypto-js");
const verify = require("../Middlewares/verifyToken");

//COUNT NO OF USER
router.get("/count", async (req, res) => {
  try {
    const numberOfUsers = (await User.find()).length;
    res.status(200).json({ numberOfUsers });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS WITH SEARCH AND FILTERS
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.search || "";
  const domain = req.query.domain || "";
  const gender = req.query.gender || "";
  const availability = req.query.availability || "";

  try {
    const searchRegex = new RegExp(search, "i");

    const filter = {
      $and: [
        { $or: [{ first_name: searchRegex }, { last_name: searchRegex }] },
        { domain: new RegExp(domain, "i") },
        { gender: new RegExp(gender, "i") },
        {
          available:
            availability !== "" ? availability === "true" : { $exists: true },
        },
      ],
    };

    const totalUsers = await User.countDocuments(filter);

    const calculatedTotalPages = Math.ceil(totalUsers / limit);

    const newPage = Math.min(page, calculatedTotalPages);
    if (totalUsers > 0) {
      const users = await User.find(filter)
        .skip((newPage - 1) * limit)
        .limit(parseInt(limit));

      res.status(200).json({
        users,
        totalPages: calculatedTotalPages,
        currentPage: newPage,
      });
    } else {
      res.status(200).json({
        users: [],
        totalPages: 1,
        currentPage: 1,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE NEW USER
router.post("/", async (req, res) => {
  try {
    const newUser = await new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD A BATCH OF USERS
router.post("/batch", async (req, res) => {
  try {
    const users = req.body; // Assuming the request body contains an array of users

    // Insert multiple users in a single batch operation
    const result = await User.insertMany(users);
    res.json({
      success: true,
      message: `${result.length} users added successfully.`,
    });
  } catch (error) {
    console.error("Error adding users in batch:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//UPDATE EXISTING USER
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
