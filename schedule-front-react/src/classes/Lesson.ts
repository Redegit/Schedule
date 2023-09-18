export class Lesson {
  name: string;
  start_dt: Date;
  end_dt: Date;
  classroom: string;
  teacher: string;
  type: string;

  constructor(
    name: string,
    start_dt: Date,
    end_dt: Date,
    classroom: string,
    teacher: string,
    type: string
  ) {
    this.name = name;
    this.start_dt = start_dt;
    this.end_dt = end_dt;
    this.classroom = classroom;
    this.teacher = teacher;
    this.type = type;
  }

//   function transformDate(Date:) {
    
//   }
}
