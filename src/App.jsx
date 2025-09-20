import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Map,
  Mic,
  Briefcase,
  LineChart,
  BookOpen,
  Users,
  CheckCircle,
  Star,
  User,
} from "lucide-react";

// ✅ Resume Maker Component
function ResumeMaker() {
  const [input, setInput] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateResume() {
    setLoading(true);
    setResume("");

    const res = await fetch("/.netlify/functions/askGemini", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();

    setResume(data.result);
    setLoading(false);
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-2xl mb-6">
      <h4 className="font-bold mb-2">📝 AI Resume Maker</h4>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows="5"
        placeholder="Enter your skills, experience, etc."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generateResume}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>

      {resume && (
        <div className="mt-4 p-3 border rounded bg-gray-50 whitespace-pre-wrap">
          {resume}
        </div>
      )}
    </div>
  );
}

function CareerDashboard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Sidebar */}
        <aside className="col-span-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User />
            </div>
            <div>
              <h4 className="font-bold">Aman Singh</h4>
              <p className="text-sm text-gray-500">Aspiring Data Scientist</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Resume Optimization</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="mt-2 text-sm">
              Score: <span className="font-semibold">65/100</span>
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Roadmap Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: "40%" }} />
            </div>
            <p className="mt-2 text-sm">Step 2 of 5</p>
          </div>

          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
            Upgrade for Full Feedback
          </button>
        </aside>

        {/* Main */}
        <main className="col-span-1 md:col-span-3 space-y-6">
          {/* ✅ Resume Maker appears here */}
          <ResumeMaker />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Resume Score</p>
                  <h3 className="text-2xl font-bold">65</h3>
                  <p className="text-sm text-gray-500">
                    ATS friendly but missing keywords
                  </p>
                </div>
                <div className="text-blue-600">
                  <Star />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-md rounded-2xl">
              <div>
                <p className="text-sm text-gray-500">Active Applications</p>
                <h3 className="text-2xl font-bold">4</h3>
                <p className="text-sm text-gray-500">2 interviews scheduled</p>
              </div>
            </div>

            <div className="bg-white p-6 shadow-md rounded-2xl">
              <div>
                <p className="text-sm text-gray-500">Roadmap Progress</p>
                <h3 className="text-2xl font-bold">40%</h3>
                <p className="text-sm text-gray-500">SQL → Python → Projects</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default function CareerAIApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-blue-700">CareerAI</h1>
      </header>

      {/* Hero Section */}
      <section className="text-center py-28 bg-gradient-to-r from-blue-100 to-blue-200">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold mb-6 text-gray-900"
        >
          🚀 Land Your Dream Job with AI
        </motion.h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Your all-in-one AI-powered career co-pilot: resumes, interviews, skill growth, job tracking, and more.
        </p>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">
            Preview: Logged-in Dashboard
          </h2>
          <CareerDashboard />
        </div>
      </section>
    </div>
  );
}
