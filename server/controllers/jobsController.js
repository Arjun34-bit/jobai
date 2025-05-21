const Job = require("../models/Jobs");

const dotenv = require("dotenv");

dotenv.config();

const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getJobRecommendation = async (req, res) => {
  const profile = req.body;
  const prompt = `Suggest top 3 jobs for this profile:\n\n${JSON.stringify(
    profile
  )} return job title, location, salary, required experience and role in JSON format and ignore the explanations return only results in arrays no symbols `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are now a job recommendation system" },
      {
        role: "user",
        content: prompt.toLowerCase(),
      },
    ],
  });

  res
    .status(201)
    .json({ data: { matches: completion.choices[0].message.content } });
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, skills, salary_range } = req.body;

    if (!title || !company || !location || !skills || !salary_range) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newJob = new Job({
      title,
      company,
      location,
      skills,
      salary_range,
    });

    // const savedJob = await Job.insertMany(req.body);

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments();
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getJobRecommendation, createJob, getJobs };
