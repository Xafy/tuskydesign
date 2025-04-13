import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

class Permission extends Model {
  public id!: number;
  public name!: string;

  static initModel(sequelize: Sequelize.Sequelize) {
    Permission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
      }
    );
    return Permission;
  }

  static associate(models: any) {
    Permission.belongsToMany(models.Role, { through: models.RolePermissions, foreignKey: 'permissionId', otherKey: 'roleId' });
  }}

export default Permission;