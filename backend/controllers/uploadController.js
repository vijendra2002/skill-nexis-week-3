import User from "../models/User.js";

export async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image"
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.userId, { avatar: imageUrl });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl
    });
  } catch (error) {
    next(error);
  }
}
