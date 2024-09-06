import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class Information{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  title: string;

  @Column() 
  description: string;

  @Column() 
  main_information: string;

  @Column() 
  image: string;

  @Column() 
  number_of_page: number;
}