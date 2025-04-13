import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface RoleAttributes {
  id?: number;
  name: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;

  static initModel(sequelize: Sequelize.Sequelize) {
    Role.init(
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
        modelName: 'Role',
        tableName: 'roles',
      }
    );
    return Role;
  }

  static associate(models: any) {
    Role.belongsToMany(models.User, { through: models.UserRoles, foreignKey: 'roleId', otherKey: 'userId' });
    Role.belongsToMany(models.Permission, { through: models.RolePermissions, foreignKey: 'roleId', otherKey: 'permissionId' });
  }
}

export default Role;