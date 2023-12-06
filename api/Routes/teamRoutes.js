const router = require("express").Router();
const Team = require("../Models/teamModel");
const validateUniqueDomains = require("../Middlewares/validateUniqueDomain");

//COUNT NO OF TEAMS
router.get("/count", async (req, res) => {
  try {
    const numberOfTeams = (await Team.find()).length;
    res.status(200).json({ numberOfTeams });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/", validateUniqueDomains, async (req, res) => {
  try {
    const userIds = req.body.users.map((user) => user._id);
    const newTeam = new Team({
      title: req.body.title,
      users: userIds,
    });
    const savedList = await newTeam.save();
    res.status(201).json(savedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL TEAMS
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  try {
    const teams = await Team.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
