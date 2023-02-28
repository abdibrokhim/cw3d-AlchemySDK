import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import Content from ".././pages/HomePage";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<>
			{/* <Content /> */}
			<div>
				<p>Made with 💙 by the AlchemyFam</p>
			</div>
		</>
	);
}
