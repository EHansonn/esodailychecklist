import Header from "../components/header";
import Layout from "../components/layout";
import image from "../public/hero.jpg";
import styles from "./index.module.css";
export default function IndexPage() {
  return (
    <Layout>
      <div className={`${styles.home}   h-screen `}>
        <div className="absolute left-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
          <div className="text-6xl text-white">ESO Daily Tracker</div>
        </div>
      </div>
    </Layout>
  );
}
