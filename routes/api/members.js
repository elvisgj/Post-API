const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../DB");

// Get all members
router.get("/", (req, res) => {
  res.json(members);
});

// Get a single member
router.get("/:id", (req, res) => {
  const isMemberFound = members.some(
    (members) => members.id === parseInt(req.params.id)
  );

  if (isMemberFound) {
    res.json(
      members.filter((members) => members.id === parseInt(req.params.id))
    );
  } else {
    res
      .status(400)
      .json({ msg: `Member with id:${req.params.id} does not exist` });
  }
});

// Create a new member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include an email and a name" });
  }
  members.push(newMember);
  res.json({ msg: "New member created", createdMember: newMember });
});

// Update a member
router.put("/:id", (req, res) => {
  const isMemberFound = members.some(
    (members) => members.id === parseInt(req.params.id)
  );

  if (isMemberFound) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updatedMember.name ? updatedMember.name : member.name),
          (member.email = updatedMember.email
            ? updatedMember.email
            : member.email);

        res.json({
          msg: `Member with id: ${req.params.id} is updated`,
          updatedMember: member,
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id:${req.params.id} does not exist` });
  }
});

// Delete a member
router.delete("/:id", (req, res) => {
  const isMemberFound = members.some(
    (members) => members.id === parseInt(req.params.id)
  );

  if (isMemberFound) {
    // stimulation for practice, you don't delete in this way
    res.json({
      msg: `Member with id:${req.params.id} is deleted`,
      allMembers: members.filter(
        (members) => members.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id:${req.params.id} does not exist` });
  }
});

module.exports = router;
