import LessonBody from './LessonBody';
import './LessonCard.scss'

export const LessonCard = ({ lessonGroup }) => {

  if (lessonGroup) {
    return (
      <div className={`lesson-card`}>
        <div className="time-container">
          <div className="time">{`${lessonGroup[0]?.number}) ${lessonGroup[0]?.getStartTime()} - ${lessonGroup[0]?.getEndTime()}`}</div>
        </div>
        <div className="lesson-group">
          {!lessonGroup.empty && lessonGroup.map((lesson, index) => <LessonBody lesson={lesson} key={index} />)}
        </div>
      </div>
    )
  } else {
    return <></>
  }
};
