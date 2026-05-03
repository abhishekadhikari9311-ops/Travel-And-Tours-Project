import Destination from "../models/destination-model.js";
import Package from "../models/package-model.js";

const getDestination = async (req, res) => {
  try {
    const destinations = await Destination.find().populate(
      "category",
      "categoryName",
    );

    const userId = req.user?.id; // safe access

    if (userId) {
      // const updatedDestinations = destinations.map((dest) => {
      //   const isLiked = userId ? dest.likes.includes(userId) : false;

      //   return {
      //     ...dest._doc,
      //     isLiked,
      //   };
      // });

      return res.status(200).json({
        destinations: destinations.map((d) => ({
          ...d.toObject(),
          liked: d.likes.some((id) => id.toString() === userId.toString()),
        })),
      });
    }

    return res.status(200).json({
      destinations: destinations.map((d) => ({
        ...d.toObject(),
      })),
      message: "Destinations retrieved successfully for guest",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPackage = async (req, res) => {
  try {
    const packages = await Package.find();

    console.log("Packages retrieved from DB:", packages);

    const userId = req.user?.id; // safe access

    if (userId) {
      console.log("User ID:", userId);
      return res.status(200).json({
        packages: packages.map((p) => ({
          ...p.toObject(),
        })),
      });
    }

    res
      .status(200)
      .json({ packages, message: "Packages retrieved successfully by all" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { getDestination, getPackage };
