import { useEffect } from "react";
import { clinicConfig } from "@/config/clinic";

/**
 * Sets dynamic <title> and <meta description> for each page.
 *
 * Title:
 *   Clinic Name | Lice Removal Near Main Area
 *
 * Meta description:
 *   Clinic Name will remove 100% of head lice & eggs in one quick guaranteed treatment.
 *   Voted by moms as Best Lice Treatment Near Me in Main Area.
 *
 * You can also pass a custom description if a page needs SEO-specific text.
 */
export function usePageMeta(page: string, customDescription?: string) {
  useEffect(() => {
    // Title format
    document.title = `${clinicConfig.clinicName} | Lice Removal Near ${clinicConfig.mainArea}`;

    // Meta description: custom if provided, otherwise default format
    const description =
      customDescription ||
      `${clinicConfig.clinicName} will remove 100% of head lice & eggs in one quick guaranteed treatment. Voted by moms as Best Lice Treatment Near Me in ${clinicConfig.mainArea}.`;

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [page, customDescription]);
}
