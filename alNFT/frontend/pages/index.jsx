import styles from "../styles/Home.module.css";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";

export default function Home() {
  return (
    <div>
      <div className="">
        <HomePage />
        {/* <ProfilePage /> */}
      </div>
    </div>
  );
}
