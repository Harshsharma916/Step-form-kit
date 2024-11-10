import Image from "next/image";
import styles from "./page.module.css";
import { FormElementsProvider } from "@/utils/context";
import CreateForm from "./create-form";

export default function Home() {
  return (
    <FormElementsProvider>
      <div className={styles.page}>
        <CreateForm />
      </div>
    </FormElementsProvider>
  );
}
