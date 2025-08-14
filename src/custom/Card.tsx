import React from "react";
import "./Card.scss";

import { useModel } from "../generic/model-store";
import { useIntl } from "@edx/frontend-platform/i18n";
import { useContextId } from "../data/hooks";

interface CourseBlock {
  complete: boolean;
  description: string | null;
  due: string | null;
  effortActivities: string | null;
  effortTime: string | null;
  icon: string | null;
  id: string;
  showLink: boolean;
  title: string;
  hideFromTOC: boolean;
  sectionId: string;
}

type CourseBlocksMap = Record<string, CourseBlock>;

interface CardChildProps {
  sequenceId: string;
  sequences: any;
}

const CardChild: React.FC<CardChildProps> = ({ sequenceId, sequences }) => {
  const courseId = useContextId();

  if (!sequenceId) {
    return <>Загрузка...</>;
  }

  if (!sequences) {
    return <>Загрузка...</>;
  }

  let cardData: CourseBlock = sequences[sequenceId];
  // console.clear();
  // console.info(`sequences[sequenceId]:${JSON.stringify(sequences[sequenceId])}`);
  // console.info(`sequences:${JSON.stringify(sequences)}`);
  // console.info(`sequenceId:${JSON.stringify(sequenceId)}`);
  return (
    <div className="card-child-wrapper">
      <a href={`/learning/course/${courseId}/${cardData.id}`}>
        <div className="card-child-wrapper__icon">Icon</div>
        <div className="card-child-wrapper__title">{cardData.title || ""}</div>
        {/* <div>{cardData.description || ""}</div> */}
      </a>
    </div>
  );
};

interface Props {
  defaultOpen: boolean;
  expand: boolean;
  section: {
    complete: boolean;
    sequenceIds: string[];
    title: string;
    hideFromTOC: boolean;
  };
}

const Card: React.FC<Props> = ({ defaultOpen, expand, section }) => {
  const intl = useIntl();
  const courseId = useContextId();

  if (!section) {
    return <div>загрузка...</div>;
  }

  // console.info("sections", section);
  const { complete, sequenceIds, title, hideFromTOC } = section;
  const { courseBlocks: { sequences } = {} } = useModel("outline", courseId);

  if (!sequences) {
    return <div>загрузка...</div>;
  }
  if (!sequenceIds) {
    return <div>загрузка...</div>;
  }

  // console.clear();
  // console.info(sequenceIds);
  // console.info(`sequences:${JSON.stringify(sequences)}`);

  return (
    <div className="cards-block">
      {/* {complete} */}
      {/* {hideFromTOC} */}
      <div className="root-card">
        <div>{title}</div>
      </div>
      {sequenceIds.map((sequenceId, index) => (
        <div key={index}>
          <CardChild
            key={index}
            sequenceId={sequenceId}
            sequences={sequences}
          />
          {/* {sequenceId} */}
          {/* key={sequenceId}
            id={sequenceId}
            sequence={sequences[sequenceId]}
            first={index === 0} */}
        </div>
      ))}
    </div>
    // <div className="card" style={{ height, width: '235px' }}>
    //   <div className={`icon-container ${iconBg}`} style={{ borderRadius: iconRadius }}>
    //     <div className={vectorClass}></div>
    //   </div>
    //   <div className="module-title">{title}</div>
    //   <div className="main-title">{subTitle}</div>
    //   {buttons.map((btn, idx) => (
    //     <div
    //       key={idx}
    //       className="button-frame"
    //       style={{
    //         gap: btn.gap,
    //         height: btn.frameHeight,
    //         justifyContent: btn.withCheckbox ? 'flex-start' : 'center'
    //       }}
    //     >
    //       {btn.withCheckbox && <div className="rectangle-840"></div>}
    //       <div className="button-text" style={{ height: btn.textHeight }}>{btn.text}</div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Card;
