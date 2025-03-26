import React, { useState } from "react";
import {
  BookOpenCheck,
  LogOut,
  Moon,
  Sun,
  Upload,
  Bell,
  Mail,
  MessageSquare,
  CreditCard,
  Trash2,
  ChevronDown,
  Check,
} from "lucide-react";

// Sample user data
const user = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@example.com",
  role: "Educator",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  subscription: "Pro Plan",
  nextBilling: "2024-04-15",
};

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Russian",
  "Arabic",
  "Other",
];

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [language, setLanguage] = useState("English");
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.name);

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpenCheck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LectureScript</span>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header> */}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">
                      {displayName}
                    </h1>
                  )}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="ml-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {isEditing
                      ? //   <Check className="h-4 w-4" />
                        "Save"
                      : "Edit"}
                  </button>
                </div>
                <p className="text-gray-500">{user.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Password Section */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Change Password
              </h2>
              <div className="space-y-4 text-gray-900">
                <div>
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <button className="w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update Password
                </button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Email Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("email")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      notifications.email ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        notifications.email ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Push Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("push")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      notifications.push ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        notifications.push ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">SMS Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("sms")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      notifications.sms ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        notifications.sms ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance & Language */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Appearance & Language
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-gray-400 mr-3" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <span className="text-gray-700">Theme</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      darkMode ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        darkMode ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 p-2 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Subscription & Billing */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Subscription & Billing
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.subscription}
                      </p>
                      <p className="text-sm text-gray-500">
                        Next billing date: {user.nextBilling}
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Account Actions */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Account Actions
              </h2>
              <button className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Once you delete your account, it cannot be recovered.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
