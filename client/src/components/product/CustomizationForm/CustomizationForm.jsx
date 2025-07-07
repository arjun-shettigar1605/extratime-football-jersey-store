import React, { useState } from "react";

const CustomizationForm = ({
  isCustomizable,
  customizationPrice,
  onCustomizationChange,
}) => {
  const [customization, setCustomization] = useState({
    enabled: false,
    playerName: "",
    playerNumber: "",
  });

  const handleToggle = () => {
    const newState = {
      ...customization,
      enabled: !customization.enabled,
      playerName: !customization.enabled ? customization.playerName : "",
      playerNumber: !customization.enabled ? customization.playerNumber : "",
    };

    setCustomization(newState);
    onCustomizationChange(newState);
  };

  const handleInputChange = (field, value) => {
    const newState = {
      ...customization,
      [field]: value,
    };

    setCustomization(newState);
    onCustomizationChange(newState);
  };

  if (!isCustomizable) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600 text-center">
          Customization not available for this product
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Customization</h3>
        <span className="text-sm text-green-600 font-medium">
          +₹{customizationPrice}
        </span>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            customization.enabled ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              customization.enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-gray-700">
          Add name and number to jersey
        </span>
      </div>

      {/* Customization Fields */}
      {customization.enabled && (
        <div className="bg-blue-50 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Name
            </label>
            <input
              type="text"
              value={customization.playerName}
              onChange={(e) => handleInputChange("playerName", e.target.value)}
              placeholder="Enter player name (max 12 characters)"
              maxLength={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {customization.playerName.length}/12 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Number
            </label>
            <input
              type="number"
              value={customization.playerNumber}
              onChange={(e) =>
                handleInputChange("playerNumber", e.target.value)
              }
              placeholder="Enter number (1-99)"
              min={1}
              max={99}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="bg-blue-100 rounded-md p-3">
            <h4 className="font-medium text-blue-900 mb-1">Preview:</h4>
            <p className="text-blue-800">
              {customization.playerName || "PLAYER NAME"} #
              {customization.playerNumber || "XX"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationForm;
