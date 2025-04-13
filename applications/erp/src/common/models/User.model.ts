import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  username: string;
  fullname: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public fullname!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  async validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static initModel(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fullname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        hooks: {
          beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
          },
        },
      }
    );
    return User;
  }

  static associate(models: any) {
    User.belongsToMany(models.Role, { through: models.UserRoles, foreignKey: 'userId', otherKey: 'roleId' });
    User.hasMany(models.Ticket, { foreignKey: 'createdBy', as: 'createdTickets' });
    User.hasMany(models.Ticket, { foreignKey: 'assignedTo', as: 'assignedTickets' });
  }
}

export default User;