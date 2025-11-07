import API from "./axios";

// Upload image to Cloudinary via backend
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
