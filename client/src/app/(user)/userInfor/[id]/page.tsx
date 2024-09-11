"use client"
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { User } from "../../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUser, updateUser } from "../../../store/reducers/userSlice";
import Swal from "sweetalert2";
import { storage } from "@/config/firebases";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import CryptoJS from "crypto-js"; // Importing crypto-js for password encryption

export default function UserInfor({ params }: { params: { id: string } }) {
  const users = useSelector((state: any) => state.users.users);
  const id = params.id;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState<string>(""); // For new password
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // For password confirmation

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    const user = users.find((item: User) => item.id == id);

    if (user) {
      setFormData(user);
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [users, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Encrypt the new password using CryptoJS
      const encryptedPassword = CryptoJS.AES.encrypt(newPassword, 'your-secret-key').toString();
      const updatedUser = {
        ...formData,
        password: encryptedPassword,
      };

      dispatch(updateUser(updatedUser));
      setIsEditing(false);
      Swal.fire("Success", "Password updated successfully", "success");
      location.reload();
    } else {
      Swal.fire("Error", "Passwords do not match", "error");
    }
  };

  const handleSave = () => {
    if (formData) {
      if (newPassword) {
        handleChangePassword();
      } else {
        dispatch(updateUser(formData));
        setIsEditing(false);
        location.reload();
      }
    }
  };

  const handleChangeAvt = () => {
    Swal.fire({
      title: "Chọn ảnh",
      input: "file",
      inputAttributes: {
        accept: "avatars/*",
        "aria-label": "Upload your profile picture",
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const file = result.value as File;
        const storageRef = ref(storage, `profile-pictures/${file.name}`);
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              if (formData) {
                const updatedUser = { ...formData, avatar: downloadURL };
                axios
                  .put(
                    `http://localhost:3000/users/${formData.id}`,
                    updatedUser
                  )
                  .then(() => {
                    setFormData(updatedUser);
                    Swal.fire({
                      title: "Ảnh của bạn",
                      imageUrl: downloadURL,
                      imageAlt: "Ảnh đã tải lên",
                    });
                  })
                  .catch((error) => {
                    console.error("Error updating avatar URL:", error);
                    Swal.fire("Error", "Failed to update avatar URL", "error");
                  });
              }
            });
          })
          .catch((error) => {
            console.error("Error uploading avatar:", error);
            Swal.fire("Error", "Failed to upload avatar", "error");
          });
      }
    });
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10 text-center text-white">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="w-32 h-32 bg-gray-600 rounded-full mb-4"
                />

                <h1 className="text-xl font-bold">{formData.userName}</h1>
                <p className="text-gray-300">
                  {formData.role ? "Admin" : "User"}
                </p>
                {isEditing && (
                  <button
                    onClick={handleChangeAvt}
                    className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Đổi Avatar
                  </button>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-4 sm:col-span-9">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-white">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
                Personal details and contact information.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-600">
              <dl className="divide-y divide-gray-600">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullname"
                        value={formData.name}
                        onChange={handleChange}
                        className="ml-3 w-full border-b border-gray-500 focus:outline-none bg-transparent text-white"
                        readOnly={!isEditing}
                      />
                    </div>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="ml-3 w-full border-b border-gray-500 focus:outline-none bg-transparent text-white"
                        readOnly={!isEditing}
                      />
                    </div>
                  </dd>
                </div>
                {/* Password Fields, visible only when editing */}
                {isEditing && (
                  <>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-white">
                        New Password
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border-b border-gray-500 focus:outline-none bg-transparent text-white"
                          placeholder="Enter new password"
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-white">
                        Confirm Password
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full border-b border-gray-500 focus:outline-none bg-transparent text-white"
                          placeholder="Confirm new password"
                        />
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
