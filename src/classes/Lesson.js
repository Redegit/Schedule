import { modules } from "./Data";

export class Lesson {
  // transformDate = (date_str) => {
  //   let date = new Date(date_str)
  //   date.setHours(date.getHours() - 3)
  //   return date
  // }

  getModule = () => {
    for (let mod of modules) {
      if (mod.disciplines.map((disc) => disc.name).includes(this.name)) {
        return mod.name;
      }
    }
  };

  getControlType = () => {
    for (let mod of modules) {
      for (let discipline of mod.disciplines) {
        if (discipline.name === this.name) {
          return discipline.control_type;
        }
      }
    }
    return "";
  };

  constructor({
    discipline,
    date,
    beginLesson,
    endLesson,
    auditorium,
    lecturer_title,
    lecturer,
    kindOfWork,
    lessonNumberStart,
    building,
    lecturerEmail,
    replaces,
    stream,
    group,
  }) {
    this.name = discipline;
    this.date = date;
    this.startTime = beginLesson;
    this.endTime = endLesson;
    this.classroom = auditorium;
    this.teacher = lecturer_title || lecturer;
    this.type = kindOfWork;
    this.subject = discipline;
    this.number = lessonNumberStart;
    this.building = building;
    this.teacherEmail = lecturerEmail;
    this.replaces = replaces;
    this.stream = stream;
    this.fromOtherModule = false;
    this.group = group;
  }

  #transformTime = (date) => {
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
  };

  getStartTime = () => {
    return this.startTime;
    // return this.#transformTime(this.startTime)
  };

  getEndTime = () => {
    return this.endTime;
    // return this.#transformTime(this.endTime)
  };

  setIsFromOtherModule = () => {
    this.fromOtherModule = true;
    return this;
  };

  setNotFromOtherModule = () => {
    this.fromOtherModule = false;
    return this;
  };
}
