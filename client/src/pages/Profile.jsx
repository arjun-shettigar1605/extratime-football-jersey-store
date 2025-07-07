import React from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button/Button";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            User Profile
          </h1>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.role}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button onClick={logout} variant="outline" className="w-full">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
