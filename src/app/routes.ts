import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import HomeworkUpload from "./pages/HomeworkUpload";
import StudentSelection from "./pages/StudentSelection";
import Camera from "./pages/Camera";
import GradingResult from "./pages/GradingResult";
import ErrorBank from "./pages/ErrorBank";
import AddError from "./pages/AddError";
import PaperConfig from "./pages/PaperConfig";
import PaperPreview from "./pages/PaperPreview";
import PersonalizedHomework from "./pages/PersonalizedHomework";
import MonitorList from "./pages/MonitorList";
import MonitorPlayer from "./pages/MonitorPlayer";
import Profile from "./pages/Profile";
import ReportList from "./pages/ReportList";
import AnalysisConfig from "./pages/AnalysisConfig";
import ReportDetail from "./pages/ReportDetail";
import ParentArchive from "./pages/ParentArchive";
import ParentHomeworkDetail from "./pages/ParentHomeworkDetail";
import ShareManage from "./pages/ShareManage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/homework-upload",
    Component: HomeworkUpload,
  },
  {
    path: "/student-selection",
    Component: StudentSelection,
  },
  {
    path: "/camera",
    Component: Camera,
  },
  {
    path: "/grading-result/:studentId",
    Component: GradingResult,
  },
  {
    path: "/error-bank",
    Component: ErrorBank,
  },
  {
    path: "/add-error",
    Component: AddError,
  },
  {
    path: "/paper-config",
    Component: PaperConfig,
  },
  {
    path: "/paper-preview",
    Component: PaperPreview,
  },
  {
    path: "/personalized-homework",
    Component: PersonalizedHomework,
  },
  {
    path: "/monitor-list",
    Component: MonitorList,
  },
  {
    path: "/monitor-player/:classId",
    Component: MonitorPlayer,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/report-list",
    Component: ReportList,
  },
  {
    path: "/analysis-config",
    Component: AnalysisConfig,
  },
  {
    path: "/report-detail/:reportId",
    Component: ReportDetail,
  },
  {
    path: "/parent-archive",
    Component: ParentArchive,
  },
  {
    path: "/parent-homework-detail",
    Component: ParentHomeworkDetail,
  },
  {
    path: "/share-manage",
    Component: ShareManage,
  },
]);
