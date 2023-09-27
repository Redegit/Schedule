export class Lesson {

  transformDate = (date_str) => {
    let date = new Date(date_str)
    date.setHours(date.getHours() - 3)
    return date
  }

  constructor({ id, name, start_dt, end_dt, classroom, teacher_ref, type, subject_ref, lesson_number }) {
    this.id = id;
    this.name = name;
    this.start_dt = this.transformDate(start_dt);
    this.end_dt = this.transformDate(end_dt);
    this.classroom = classroom;
    this.teacher = teacher_ref;
    this.type = type;
    this.subject = subject_ref;
    this.lesson_number = lesson_number;
  }

  #transformTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`
  }

  getStartTime = () => {
    return this.#transformTime(this.start_dt)
  }

  getEndTime = () => {
    return this.#transformTime(this.end_dt)
  }
}
