import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useIntl } from "@edx/frontend-platform/i18n";
import { useModel } from "../generic/model-store";
import { getAuthenticatedUser } from "@edx/frontend-platform/auth";
// import useCourseEndAlert from "../course-home/outline-tab/alerts/course-end-alert";
import useCourseStartAlert from "../alerts/course-start-alert";
import usePrivateCourseAlert from "../course-home/outline-tab/alerts/private-course-alert";
import useScheduledContentAlert from "../course-home/outline-tab/alerts/scheduled-content-alert";
import ShiftDatesAlert from "../course-home/suggested-schedule-messaging/ShiftDatesAlert";
import UpgradeToShiftDatesAlert from "../course-home/suggested-schedule-messaging/UpgradeToShiftDatesAlert";
import useCertificateAvailableAlert from "../course-home/outline-tab/alerts/certificate-status-alert";
import messages from "../course-home/outline-tab/messages";
import "./Home.scss";
import LmsHtmlFragment from "../course-home/outline-tab/LmsHtmlFragment";
import WelcomeMessage from "../course-home/outline-tab/widgets/WelcomeMessage";
import truncate from "truncate-html";

const Home = () => {
  const intl = useIntl();
  const {
    // resumeCourse: { hasVisitedCourse = false, url: resumeCourseUrl },
    courseId,
  } = useSelector((state) => state.courseHome);

  console.info(courseId);

  // if (courseId == null) {
  //   return <>Загрузка...</>;
  // }

  // const {
  //   org,
  // } = useModel('courseHomeMeta', courseId);

  // const eventProperties = {
  //   org_key: org,
  //   courserun_key: courseId,
  // };

  // const {
  // resumeCourse: { hasVisitedCourse, url: resumeCourseUrl },
  // } = useModel("outline", courseId);

  const a = useModel("outline", courseId);
  if (!a || (!a.resumeCourse && !a.welcomeMessageHtml)) {
    return <>Загрузка</>;
  }

  console.info(JSON.stringify(a));

  const {
    resumeCourse: { hasVisitedCourse, url: resumeCourseUrl },
    welcomeMessageHtml,
  } = a;

  // const expandButtonRef = React.useRef();

  // const outlinecourseId = useModel("outline", courseId);

  // if (!outlinecourseId || typeof outlinecourseId == "undefined") {
  //   return <>Загрузка...</>;
  // }

  // const {
  //   courseBlocks: { courses, sections },
  //   resumeCourse: { hasVisitedCourse, url: resumeCourseUrl },
  //   courseGoals: { selectedGoal, weeklyLearningGoalEnabled } = {},
  //   datesWidget: { courseDateBlocks } = {},
  //   enableProctoredExams,
  // } = useModel("outline", courseId);

  // const [expandAll, setExpandAll] = React.useState(false);
  // const navigate = useNavigate();

  // if(!hasVisitedCourse || typeof(hasVisitedCourse) == "undefined"){return(<>Загрузка</>)}

  // Below the course title alerts (appearing in the order listed here)
  // const courseStartAlert = useCourseStartAlert(courseId);
  // const courseEndAlert = useCourseEndAlert(courseId);
  // const certificateAvailableAlert = useCertificateAvailableAlert(courseId);
  // const privateCourseAlert = usePrivateCourseAlert(courseId);
  // const scheduledContentAlert = useScheduledContentAlert(courseId);

  // const rootCourseId = courses && Object.keys(courses)[0];

  // const hasDeadlines =
  //   courseDateBlocks &&
  //   courseDateBlocks.some((x) => x.dateType === "assignment-due-date");

  // const logUpgradeToShiftDatesLinkClick = () => {
  //   sendTrackEvent("edx.bi.ecommerce.upsell_links_clicked", {
  //     ...eventProperties,
  //     linkCategory: "personalized_learner_schedules",
  //     linkName: "course_home_upgrade_shift_dates",
  //     linkType: "button",
  //     pageName: "course_home",
  //   });
  // };

  // const isEnterpriseUser = () => {
  //   const authenticatedUser = getAuthenticatedUser();
  //   const userRoleNames = authenticatedUser
  //     ? authenticatedUser.roles.map((role) => role.split(":")[0])
  //     : [];

  //   return userRoleNames.includes("enterprise_learner");
  // };

  /** show post enrolment survey to only B2C learners */
  // const learnerType = isEnterpriseUser() ? "enterprise_learner" : "b2c_learner";

  // const location = useLocation();

  // React.useEffect(() => {
  //   const currentParams = new URLSearchParams(location.search);
  //   const startCourse = currentParams.get("start_course");
  //   if (startCourse === "1") {
  //     sendTrackEvent("enrollment.email.clicked.startcourse", {});

  //     // Deleting the course_start query param as it only needs to be set once
  //     // whenever passed in query params.
  //     currentParams.delete("start_course");
  //     navigate({
  //       pathname: location.pathname,
  //       search: `?${currentParams.toString()}`,
  //       replace: true,
  //     });
  //   }
  // }, [location.search]);

  const logResumeCourseClick = () => {
    sendTrackingLogEvent("edx.course.home.resume_course.clicked", {
      ...eventProperties,
      event_type: hasVisitedCourse ? "resume" : "start",
      url: resumeCourseUrl,
    });
  };

  // const b = useModel("outline", courseId);
  // if (!b || !b.welcomeMessageHtml) {
  //   return <>Загрузка</>;
  // }

  // const { welcomeMessageHtml } = b;

  if (!welcomeMessageHtml) {
    return <>Загрузка</>;
  }

  // const cleanedWelcomeMessageHtml = React.useMemo(
  //   () =>
  //     truncate(welcomeMessageHtml, welcomeMessageHtml.length, {
  //       keepWhitespaces: true,
  //     }),
  //   [welcomeMessageHtml]
  // );
  // const shortWelcomeMessageHtml = React.useMemo(
  //   () =>
  //     truncate(cleanedWelcomeMessageHtml, 100, {
  //       byWords: true,
  //       keepWhitespaces: true,
  //     }),
  //   [cleanedWelcomeMessageHtml]
  // );
  // const messageCanBeShortened = React.useMemo(
  //   () => shortWelcomeMessageHtml.length < cleanedWelcomeMessageHtml.length,
  //   [cleanedWelcomeMessageHtml, shortWelcomeMessageHtml]
  // );

  return (
    <div className="content">
      <div className="first-column">
        <div className="wellcome-message">
          <WelcomeMessage courseId={courseId} nextElementRef={null} />
        </div>
        <div className="buttons">
          <button className="start-button" onClick={logResumeCourseClick}>
            <span>
              {
                hasVisitedCourse ? "Продолжить" : "Начать"
                // ? intl.formatMessage(messages.resume)
                // : intl.formatMessage(messages.start)
              }
            </span>
            <div className="arrow-icon"></div>
          </button>
          <button className="ai-button">
            <span>Если есть вопросы могу помочь</span>
            <div className="ai-icon"></div>
          </button>
        </div>
      </div>
      <div className="second-column">
        <div className="national-bank">
          <div className="bank-logo"></div>
          <p className="bank-text">Курс разработан при поддержке Нацбанка.</p>
        </div>

        <div className="orleu-center">
          <div className="orleu-logo"></div>
          <p className="orleu-text">
            Курс разработан при поддержке АО «Национальный центр повышения
            квалификации «Өрлеу».
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
