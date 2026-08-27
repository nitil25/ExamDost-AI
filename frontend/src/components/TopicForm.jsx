import React, { use, useEffect, useState } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [examType, setExamType] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [revisonMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const handleSubmit = async () => {
    try {
      if (!topic.trim()) {
        setError("Please enter the topic");
        return;
      }

      setError("");
      setLoading(true);
      setResult(null);

      const result = await generateNotes({
        topic,
        examType,
        classLevel,
        revisonMode,
        includeDiagram,
        includeChart,
      });
      setResult(result?.data);

      setLoading(false);
      setTopic("");
      setClassLevel("");
      setExamType("");
      setRevisionMode(false);
      setIncludeChart(false);
      setIncludeDiagram(false);

      if (typeof result?.creditsLeft === "number") {
        dispatch(updateCredits(result?.creditsLeft));
      }
    } catch (error) {
      console.log("Handle submit error :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 95) {
        setProgressText("Almost Done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizong Notes...");
      } else if (value > 40) {
        setProgressText("Procesing Content");
      } else {
        setProgressText("Generating Notes...");
      }
      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white"
    >
      <input
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        type="text"
        placeholder="Enter topic (e.g. Web Development)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30 "
      />
      <input
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        type="text"
        placeholder="Enter class / level (e.g. class 10)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30 "
      />
      <input
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
        type="text"
        placeholder="Enter Type (e.g. CBSE, JEE, NEET)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30 "
      />
      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label={"Exam Revesion Mode"}
          checked={revisonMode}
          onChange={() => setRevisionMode(!revisonMode)}
        />
        <Toggle
          label={"Include Diagram"}
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label={"Include Chart"}
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>
      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        animate={{ duration: 0.7 }}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-linear-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)] cursor-pointer"}`}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>

      {loading && (
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className="h-full bg-linear-to-r from-green-400 via-emerald-400 to-green-500"
            ></motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            This may take up to 2-5 minutes. Please don't close or refresh the
            page.
          </p>
        </div>
      )}
    </motion.div>
  );
};

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className="flex items-center gap-4 cursor-pointer select-none"
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          style={{ left: checked ? "1.6rem" : "0.25rem" }}
        ></motion.div>
      </motion.div>
      <span
        className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"}`}
      >
        {label}
      </span>
    </div>
  );
};

export default TopicForm;

