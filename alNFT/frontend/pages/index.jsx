import styles from "../styles/Home.module.css";
// import InstructionsComponent from "../components/InstructionsComponent";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

export default function Home() {
  return (
    <div>
      <div className="">
        {/* <InstructionsComponent></InstructionsComponent> */}
        {/* <HomePage /> */}
        <ProfilePage />
      </div>
    </div>
  );
}
