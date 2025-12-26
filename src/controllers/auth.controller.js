const prisma = require("../services/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already registered" });


    let userRole = "USER";
    if (role === "ADMIN") {
      const adminExists = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (adminExists)
        return res.status(403).json({ success: false, message: "Admin already exists" });
      userRole = "ADMIN";
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, role: userRole }
    });

    const { password: _, ...safeUser } = user;
    res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
