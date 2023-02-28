import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import Content from "../pages/HomePage";

export default function Home() {
  return (
    <div>
      <div className="">
        {/* <InstructionsComponent></InstructionsComponent> */}
        <Content />
      </div>
    </div>
  );
}
