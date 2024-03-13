import express from "express";

const router = express.Router();

/**
 * @swagger
 * /menu:
 *  get:
 *   summary: Use to request all menu items
 *   description: Use to request all menu items
 *   responses:
 *    '200':
 *     description: A successful response
 *   content:
 *    application/json:
 */
router.get("/menu", (req, res) => {
  res.status(200).json({
    menu: {
      item1: "pizza",
      item2: "burger",
      item3: "fries",
    },
  });
});

export default router;
