import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  password: string;

  @BeforeInsert()
  async hasPassword() {
    this.hashedPassword = await hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  hashedPassword: string;

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
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field({ nullable: true })
  @Length(2, 30, { message: "Le prénom doit faire entre 2 et 30 caractères" })
  first_name: string;

  @Field({ nullable: true })
  @Length(2, 30, { message: "Le nom doit faire entre 2 et 30 caractères" })
  last_name: string;
}

@InputType()
export class UpdateUserInput {}
