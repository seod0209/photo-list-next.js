import dynamic from "next/dynamic";

// Importing modules
const Header = dynamic(() => import("list/src/component/Header"), { suspense: true });

export default function Home() {
    return (
        <>
            <div> {"CONTAINER"}</div>
            <Header />
        </>
    );
}
