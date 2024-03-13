import Menu from "./menu.js";

const router = (app) => {
  /**
   * @swagger
   * /status:
   *  get:
   *   summary: Use to request all customers
   *   description: Use to request all customers
   *   responses:
   *     '200':
   *       description: A successful response
   */
  app.get("/status", (req, res) => {
    res.status(200).json({ status: "connected" });
  });
  app.use(Menu);
};

export default router;
