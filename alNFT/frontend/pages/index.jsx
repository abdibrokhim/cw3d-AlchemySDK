import styles from "../styles/Home.module.css";
// import InstructionsComponent from "../components/InstructionsComponent";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";

export default function Home() {
  return (
    <div>
      <div className="">
        {/* <InstructionsComponent></InstructionsComponent> */}
        <HomePage />
        {/* <ProfilePage /> */}
      </div>
    </div>
  );
}
