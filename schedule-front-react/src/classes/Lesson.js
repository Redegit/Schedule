export class Lesson {

  // transformDate = (date_str) => {
  //   let date = new Date(date_str)
  //   date.setHours(date.getHours() - 3)
  //   return date
  // }


  getModule = () => {
    for (let mod of modules) {
      if (mod.disciplines.includes(this.name)) {
        return mod.name
      }
    }
  }

  constructor({ id, discipline, date, beginLesson, endLesson, auditorium, lecturer_title, lecturer, kindOfWork, lessonNumberStart, building, lecturerEmail, replaces, stream }) {
    this.id = id;
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
  }

  #transformTime = (date) => {
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
  }

  getStartTime = () => {
    return this.startTime
    // return this.#transformTime(this.startTime)
  }

  getEndTime = () => {
    return this.endTime
    // return this.#transformTime(this.endTime)
  }
}

export const modules = [
  {
    name: "Общие",
    disciplines: [
      "Иностранный язык в профессиональной сфере",
      "Информационное право",
      "Машинное обучение в семантическом и сетевом анализе",
      "Программная инженерия",
      "Бухгалтерские информационные системы"
    ]
  },
  {
    name: "ERP-системы",
    disciplines: [
      "Разработка корпоративных и облачных приложений",
      "Корпоративные информационные системы"
    ]
  },
  {
    name: "Системное программирование",
    disciplines: [
      "Разработка эффективных вычислительных алгоритмов",
      "Низкоуровневое программирование"
    ]
  },
  {
    name: "Управление разработкой",
    disciplines: [
      "Управление качеством программных систем",
      "Проектирование информационных систем"
    ]
  },
  {
    name: "Технологии искусственного интеллекта",
    disciplines: [
      "Технологии и алгоритмы анализа сетевых моделей"
    ]
  },
  {
    name: "Языки и методы программирования",
    disciplines: [
      "Программирование в среде R"
    ]
  },
  {
    name: "Разработка распределенных приложений",
    disciplines: [
      "Основы технологий интернета вещей"
    ]
  },
  {
    name: "Технологии машинного обучения",
    disciplines: [
      "Оптимизационные задачи в машинном обучении"
    ]
  },
  {
    name: "Финтех",
    disciplines: [
      "Теоретические основы финансовых технологий"
    ]
  }
]