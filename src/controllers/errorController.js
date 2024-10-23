const handleError = (err, req, res, next) => {
  console.error('エラー:', err);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'バリデーションエラー',
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: '一意制約違反',
      message: '指定された主キーの組み合わせは既に存在します'
    });
  }

  res.status(500).json({
    error: 'サーバーエラー',
    message: err.message
  });
};

module.exports = {
  handleError
};