import {
  Entity,
  ObjectID,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false })
  read: string;

  @CreateDateColumn()
  created_at: string;

  @CreateDateColumn()
  updated_at: Date;
}

export default Notification;
