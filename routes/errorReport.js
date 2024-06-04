const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // 데이터베이스 연결을 위한 pool 구성

// 오류 보고를 수신하는 POST 라우트
router.post('/report-error', async (req, res) => {
    const { errorDetails } = req.body;
    
    if (!errorDetails) {
        return res.status(400).json({ message: 'Error details are required' });
    }

    try {
        const result = await pool.query('INSERT INTO temp (error_details) VALUES ($1)', [errorDetails]);
        res.status(201).json({ message: 'Error details submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving error details' });
    }
});

module.exports = router;
