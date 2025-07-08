import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

const Signup = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...userData } = formData;
      await register(userData);
    } catch (error) {
      // Error is handled in context with toast
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Jersey display */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
            src="/images/login-bg.jpg"
            alt="Football jerseys display"
            className="w-full h-full object-cover"
        />
        {/* Optional overlay for better text readability on the right side */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 bg-lime-300 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div>
              <img
                src="/images/logo.png"
                alt="Football jerseys display"
                className="inline justify-center items-center w-48 h-full object-cover"
              />
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            <div>
              <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h3>
              <p className="mt-2 text-center text-m text-gray-600">
                Join Extra-Time Today!!
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full"
                  >
                    Create Account
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
