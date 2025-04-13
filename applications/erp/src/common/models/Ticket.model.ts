import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

class Ticket extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'Open' | 'Assigned' | 'In Progress' | 'Completed' | 'Closed';
  public createdBy!: number;
  public assignedTo!: number | null;
  public priority!: 'Low' | 'Medium' | 'High';

  static initModel(sequelize: Sequelize.Sequelize) {
    Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('Open', 'Assigned', 'In Progress', 'Completed', 'Closed'),
          allowNull: false,
          defaultValue: 'Open',
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        assignedTo: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        priority: {
          type: DataTypes.ENUM('Low', 'Medium', 'High'),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Ticket',
        tableName: 'tickets',
      }
    );
    return Ticket;
  }

  static associate(models: any) {
    Ticket.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Ticket.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
  }
}

export default Ticket;