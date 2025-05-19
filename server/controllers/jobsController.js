const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getJobRecommendation = async (req, res) => {
  const profile = req.body;
  const prompt = `Suggest top 3 jobs for this profile:\n\n${JSON.stringify(
    profile
  )}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  res.json({ matches: completion.choices[0].message.content });
};

module.exports = { getJobRecommendation };
