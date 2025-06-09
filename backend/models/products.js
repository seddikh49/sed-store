import { DataTypes } from 'sequelize';
import { sequelize } from '../postgres/postgres.js';


const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "اسم المنتج لا يمكن أن يكون فارغًا"
      }
    }
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "اسم المنتج لا يمكن أن يكون فارغًا"
      }
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "اسم المنتج لا يمكن أن يكون فارغًا"
      }
    }
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Assuming it's an array of image URLs
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "اسم المنتج لا يمكن أن يكون فارغًا"
      }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "اسم المنتج لا يمكن أن يكون فارغًا"
      }
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'products',
  timestamps: false
});

export default Product;