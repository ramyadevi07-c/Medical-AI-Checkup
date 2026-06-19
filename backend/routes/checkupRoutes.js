// const express = require('express');
// const router = express.Router();
// const { spawn } = require('child_process');

// router.post('/checkup', async (req, res) => {
//   try {
//     const userData = req.body;
//     const python = spawn('python', ['./ai/aiModel.py', JSON.stringify(userData)]);

//     let dataToSend = '';
//     python.stdout.on('data', (data) => { dataToSend += data.toString(); });
//     python.on('close', (code) => {
//       res.json({ success: true, data: JSON.parse(dataToSend) });
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/checkup', async (req, res) => {
  try {
    console.log("Frontend sent payload:", req.body);

    // Bypassing Python completely with guaranteed perfect structural data
    const mockAIData = [
      { condition: "Common Cold", probability: 0.85, urgency: "Low", advice: "Rest, stay hydrated, and monitor temperature." },
      { condition: "Flu", probability: 0.62, urgency: "Medium", advice: "Rest and consider over-the-counter antiviral support." },
      { condition: "Seasonal Allergies", probability: 0.45, urgency: "Low", advice: "Avoid known triggers and use an antihistamine." }
    ];

    return res.json({ success: true, data: mockAIData });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;