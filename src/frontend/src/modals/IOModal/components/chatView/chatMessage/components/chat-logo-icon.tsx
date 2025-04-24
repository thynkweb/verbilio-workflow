import VerbilioLogoDark from "@/assets/VerbilioLogoDark.png";
import VerbilioLogoLight from "@/assets/VerbilioLogoLight.png";
import { useDarkStore } from "../../../../../../stores/darkStore";

export default function LogoIcon() {
  const { dark } = useDarkStore();
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-muted">
      <div className="flex h-8 w-8 items-center justify-center">
        <img
          src={dark ? VerbilioLogoDark : VerbilioLogoLight}
          alt="Verbilio Logo"
        />
      </div>
    </div>
  );
}
