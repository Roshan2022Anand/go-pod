import { Router } from "express";
import { createToken, verifyToken } from "../utils/jwt";

const router = Router();

router.post("/login", (req, res) => {
  const { name, email } = req.body;
  const tocken = createToken(email, name);

  res.cookie("tocken", tocken, {
    httpOnly: true,
    secure: process.env.SECURE === "true",
    maxAge: 60 * 60 * 1000,
    sameSite: "none",
  });
  res.status(200).json({
    msg: "Login successful",
  });
});

router.get("/user", (req, res) => {
  const tocken = req.cookies.tocken;
  if (!tocken) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  const payload = verifyToken(tocken);
  if (!payload) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  res.status(200).json(payload);
});

export default router;
