const Tracking = require('../models/tracking');
const sequelize = require('../config/database');
const { parseNumericValue } = require('./commonsController');

const getCurrentDateTime = () => {
  const now = new Date();
  const date = parseInt(
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0')
  );
  const time = parseInt(
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0')
  );
  return { date, time };
};

const saveTrackingData = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { trackingData } = req.body;
    const { date: currentDate, time: currentTime } = getCurrentDateTime();
    
    const results = [];
    
    for (const data of trackingData) {
      const [record, created] = await Tracking.findOrCreate({
        where: {
          日付: data.date,
          時刻: data.time,
          デバイスID: data.deviceId
        },
        defaults: {
          緯度: data.lat.toString(),
          経度: data.lng.toString(),
          作成日付: currentDate,
          作成時刻: currentTime,
          更新日付: currentDate,
          更新時刻: currentTime,
          バージョン: 0
        },
        transaction
      });

      if (!created) {
        await record.update({
          緯度: data.lat.toString(),
          経度: data.lng.toString(),
          更新日付: currentDate,
          更新時刻: currentTime,
          バージョン: sequelize.literal('バージョン + 1')
        }, { transaction });
        
        await record.reload({ transaction });
      }
      
      results.push(record);
    }
    
    await transaction.commit();
    console.log('保存された位置情報:', JSON.stringify(results, null, 2));
    
    res.status(200).json({
      message: '位置情報の保存が完了しました',
      count: results.length
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports = {
  saveTrackingData
};