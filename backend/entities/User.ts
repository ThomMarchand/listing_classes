import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ default: "Veuillez renseigner un prénom" })
  first_name: string;

  @Field()
  @Column({ default: "Veuillez renseigner un nom" })
  last_name: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;
}

@InputType()
export class UpdateUserInput {}
