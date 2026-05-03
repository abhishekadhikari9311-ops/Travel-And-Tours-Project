import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://abhishekadhikari982_db_user:GFtrqJGqYBoqWWMw@cluster0.5ikxbtl.mongodb.net/TravelsAndTours?appName=Cluster0");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
