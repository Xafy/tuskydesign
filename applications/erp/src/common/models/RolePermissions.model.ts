import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

class RolePermissions extends Model {
  public roleId!: number;
  public permissionId!: number;

  static initModel(sequelize: Sequelize.Sequelize) {
    RolePermissions.init(
      {
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        permissionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'RolePermissions',
        tableName: 'role_permissions',
      }
    );
    return RolePermissions;
  }
}

export default RolePermissions;