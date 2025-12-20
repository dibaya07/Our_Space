const jwt = require("jsonwebtoken");
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;

async function requireAuth(req, res, next) {
  try {
    console.log("[requireAuth] Incoming request:", req.method, req.originalUrl);
    // 1️⃣ Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("[requireAuth] No or invalid Authorization header");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ Extract token

    const token = authHeader.split(" ")[1];
    console.log("[requireAuth] Token:", token);

    // 3️⃣ Verify token

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log("[requireAuth] Decoded token:", decoded);
    } catch (err) {
      console.log("[requireAuth] Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }


    // 4️⃣ Find user in DB (file or MongoDB)

    const user = await db.find('users', decoded.id);
    console.log("[requireAuth] User lookup by id:", decoded.id, "Result:", user);
    if (!user) {
      console.log("[requireAuth] User not found for id:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    // 5️⃣ Attach user to request
    req.user = {
      id: user.id,
      name: user.name,
      ...(user.femaleName ? { femaleName: user.femaleName } : {}),
      ...(user.maleName ? { maleName: user.maleName } : {}),
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = requireAuth;
