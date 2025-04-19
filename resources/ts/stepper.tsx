import { createRoot } from "react-dom/client";

import I18nProvider from "@/components/localizationProvider";
import Stepper from "@/components/stepper";

export default function StepperWrapper() {
  return (
    <I18nProvider>
      <Stepper />
    </I18nProvider>
  );
}

const root = createRoot(document.getElementById("stepper"));
root.render(<StepperWrapper />);
