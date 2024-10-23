const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body.trackingData) {
    console.log('受信データ:', JSON.stringify(req.body.trackingData, null, 2));
  }
  next();
};

const parseNumericValue = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = value.replace(/['"]/g, '');
    return isNaN(parsed) ? null : Number(parsed);
  }
  return null;
};

const validateRequest = (req, res, next) => {
  if (!req.body.trackingData || !Array.isArray(req.body.trackingData)) {
    return res.status(400).json({ error: 'リクエストの形式が不正です' });
  }

  const isValid = req.body.trackingData.every(data => {
    const date = parseNumericValue(data.date);
    const time = parseNumericValue(data.time);
    const lat = parseNumericValue(data.lat);
    const lng = parseNumericValue(data.lng);

    return date && 
           time && 
           data.deviceId &&
           lat !== null &&
           lng !== null;
  });

  if (!isValid) {
    return res.status(400).json({ error: '必須項目が不足しているか、データ型が不正です' });
  }

  // 数値をパースして更新
  req.body.trackingData = req.body.trackingData.map(data => ({
    ...data,
    date: parseNumericValue(data.date),
    time: parseNumericValue(data.time),
    lat: parseNumericValue(data.lat),
    lng: parseNumericValue(data.lng)
  }));

  next();
};

module.exports = {
  logger,
  validateRequest,
  parseNumericValue
};