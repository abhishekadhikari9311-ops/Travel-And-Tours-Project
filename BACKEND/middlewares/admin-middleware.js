const adminMiddleware = (req, res, next) => {
  try {
    const user = req.user;

    console.log("User in adminMiddleware:", user);

    if (!user || user.role !== "admin") {
      return res.status(400).json({ message: "Access denied. Admin only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in adminMiddleware:", error);
  }
};

export default adminMiddleware;
