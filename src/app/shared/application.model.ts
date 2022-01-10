import { Skill } from './skill.model';

export class Application{
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public patronymic: string,
    public phoneNumber: string,
    public workOrStudy: string,
    public gender: string,
    public size: string,
    public skills: Skill[],
    public comments: string
  ) {}
}
