import { sequelize } from '../postgres/postgres.js';
import { DataTypes } from 'sequelize';

const Order = sequelize.define("Order", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "الاسم الكامل مطلوب",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^0\d{9}$/],
        msg: "رقم الهاتف يجب أن يبدأ بـ 0 ويتكون من 10 أرقام فقط",
      },
    },
  },
  wilaya: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "الولاية مطلوبة",
      },
    },
  },
  commune: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "البلدية مطلوبة",
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "الكمية يجب أن تكون أكبر من صفر",
      },
    },
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notification: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
   tableName: 'orders', // <-- اجبر Sequelize على استخدام اسم صغير
  timestamps: false,   // أوقف الحقول التلقائية createdAt و updatedAt
});

export default Order;
