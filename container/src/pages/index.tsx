import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@styles/Home.module.css";
import dynamic from "next/dynamic";

// Importing modules
const Header = dynamic(() => import("list/src/component/Header"), { suspense: true });

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Header />
        </>
    );
}
