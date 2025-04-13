import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

class UserRoles extends Model {
  public userId!: number;
  public roleId!: number;

  static initModel(sequelize: Sequelize.Sequelize) {
    UserRoles.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'UserRoles',
        tableName: 'user_roles',
      }
    );
    return UserRoles;
  }
}

export default UserRoles;