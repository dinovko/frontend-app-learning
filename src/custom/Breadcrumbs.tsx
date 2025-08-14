import "./Breadcrumbs.scss";
import { getConfig } from "@edx/frontend-platform";

const Breadcrumbs = () => {
  const lmsBaseUrl = getConfig().LMS_BASE_URL;
  const coursesUrl = `${lmsBaseUrl}/dashboard`;

  console.info(coursesUrl);
  return (
    <div className="breadcrumbs">
      <a href={lmsBaseUrl}>Главная</a>

      <span>›</span>
      <a href={coursesUrl}>Мои курсы</a>
      <span>›</span>
    </div>
  );
};

export default Breadcrumbs;
