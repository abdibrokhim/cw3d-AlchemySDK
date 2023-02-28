import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Wallet from "../Wallet";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
				<img className={styles.alchemy_logo} src="/cw3d-logo.png"></img>
			</a>
			<div 
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
				}}
			>
				<ConnectButton></ConnectButton>
				<Wallet />
			</div>
		</nav>
	);
}
