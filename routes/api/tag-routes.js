const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    if (!tagData) {
      res
        .status(400)
        .json({ message: "No catergory tag fround with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowCount] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedRowCount === 0) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    const updatedTag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json("Tag has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
