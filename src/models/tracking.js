const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tracking = sequelize.define('F位置情報', {
  日付: {
    type: DataTypes.DECIMAL(8, 0),
    allowNull: false,
    primaryKey: true
  },
  時刻: {
    type: DataTypes.DECIMAL(6, 0),
    allowNull: false,
    primaryKey: true
  },
  デバイスID: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  緯度: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  経度: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  作成日付: {
    type: DataTypes.DECIMAL(8, 0),
    allowNull: true
  },
  作成時刻: {
    type: DataTypes.DECIMAL(6, 0),
    allowNull: true
  },
  更新日付: {
    type: DataTypes.DECIMAL(8, 0),
    allowNull: true
  },
  更新時刻: {
    type: DataTypes.DECIMAL(6, 0),
    allowNull: true
  },
  バージョン: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'F位置情報',
  schema: 'dbo',
  timestamps: false
});

module.exports = Tracking;