import React from "react";
import "./Card.scss";

import { useModel } from "../generic/model-store";
import { useIntl } from "@edx/frontend-platform/i18n";
import { useContextId } from "../data/hooks";

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

  console.info("sections", section);
  const { complete, sequenceIds, title, hideFromTOC } = section;
  const { courseBlocks: { sequences } = {} } = useModel("outline", courseId);

  if (!sequences) {
    return <div>загрузка...</div>;
  }
  if (!sequenceIds) {
    return <div>загрузка...</div>;
  }

  console.info(sequenceIds)

  return (
    <div>
      {/* {complete} */}
      {/* {hideFromTOC} */}
      <div>
        <div>{title}</div>
        {sequenceIds.map((sequenceId, index) => (
          <div key={index}>
            <div>
              {sequences[sequenceId].title}
            </div>
            {/* {sequenceId} */}
            {/* key={sequenceId}
            id={sequenceId}
            sequence={sequences[sequenceId]}
            first={index === 0} */}
          </div>
        ))}
      </div>
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
