import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

const USER_ROLE = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
} as const;

@ObjectType()
@Entity()
@Unique(["email"])
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
  firstName: string;

  @Field()
  @Column({ default: "Veuillez renseigner un nom" })
  lastName: string;

  @Field()
  @Column({ default: USER_ROLE.STUDENT })
  status: string;
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
  firstName: string;

  @Field({ nullable: true })
  @Length(2, 30, { message: "Le nom doit faire entre 2 et 30 caractères" })
  lastName: string;

  @Field({ nullable: true })
  status: string;
}

@InputType()
export class SigninInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class UpdateUserInput {}
