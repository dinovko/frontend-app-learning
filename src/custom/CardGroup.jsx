import React from "react";
import Card from "./Card";
import "./Card.scss";

import { useModel } from "../generic/model-store";
import { useIntl } from "@edx/frontend-platform/i18n";
import { useSelector } from "react-redux";

const CardGroup = () => {
  const scrollRef = React.useRef();

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 200; // пикселей за шаг
    const newScroll =
      direction === "left"
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };
  //#endregion store
  const intl = useIntl();

  const { courseId, proctoringPanelStatus } = useSelector(
    (state) => state.courseHome
  );

  const { isSelfPaced, org, title } = useModel("courseHomeMeta", courseId);

  const {
    courseBlocks: { courses, sections } = {},
    courseGoals: { selectedGoal, weeklyLearningGoalEnabled } = {},
    datesWidget: { courseDateBlocks } = {},
    enableProctoredExams,
  } = useModel("outline", courseId) || {};

  if (!courses) {
    return <div>загрузка...</div>;
  }

  const rootCourseId = courses && Object.keys(courses)[0];

  //#endregion

  const coursesList = courses[rootCourseId].sectionIds;

  if (!coursesList) {
    return <div>загрузка...</div>;
  }

  //   console.info('coursesList',coursesList);
  return (
    <div className="card-group-wrapper">
      <div className="card-group" ref={scrollRef}>
        {Array.isArray(coursesList) &&
          coursesList.map((sectionId, index) => (
            <Card
              key={index}
              // {...data}
              expandAll={true}
              sectionIds={courses[rootCourseId].sectionIds}
              section={sections[sectionId]}
            />
          ))}
      </div>
      <div className="scroll-btns">
        <button className="scroll-btn-left" onClick={() => scroll("left")}>
          ◀
        </button>
        <button className="scroll-btn-right" onClick={() => scroll("right")}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default CardGroup;
