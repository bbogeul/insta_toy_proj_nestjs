import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

export class BaseEntity<T> extends TypeOrmBaseEntity {
  constructor(partial?: Partial<T>) {
    super();
  }

  // DTO값으로 새로운 entity 생성 시 사용
  set(partial: Object): this {
    partial &&
      Object.keys(partial).map((key) => {
        if (key !== 'id' && partial[key] !== undefined) {
          this[key] = partial[key];
        }
      });
    return this;
  }

  // 공통 컬럼
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'int',
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date = new Date();

  toJSON() {
    console.log(this);
    Object.keys(this).map((key) => {
      if ((this[key] && this[key] === '') || this[key] === null) {
        delete this[key];
      }
    });

    return this;
  }
}
