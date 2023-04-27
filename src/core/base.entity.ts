import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

export class BaseEntity<T> extends TypeOrmBaseEntity {
  constructor(partial?: Partial<T>) {
    super();
    // 자바에 JsonIgnore Serialization 구현
    Object.keys(partial).forEach((key) => {
      if ((partial[key] && partial[key] === '') || !partial[key])
        delete partial[key];
    });
    return this;
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
  protected id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  protected createdAt?: Date = new Date();
}
