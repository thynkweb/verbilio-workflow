import { useLogout } from "@/controllers/API/queries/auth";
import CustomFeatureFlagDialog from "@/customization/components/custom-feature-flag-dialog";
import CustomFeatureFlagMenuItems from "@/customization/components/custom-feature-flag-menu-items";
import { CustomFeedbackDialog } from "@/customization/components/custom-feedback-dialog";
import { CustomHeaderMenuItemsTitle } from "@/customization/components/custom-header-menu-items-title";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import { ENABLE_DATASTAX_LANGFLOW } from "@/customization/feature-flags";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAuthStore from "@/stores/authStore";
import { useDarkStore } from "@/stores/darkStore";
import { useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { useParams } from "react-router-dom";
import useTheme from "../../../../../customization/hooks/use-custom-theme";
import FacebookIcon from "../../../../../icons/Facebook";
import InstagramIcon from "../../../../../icons/Instagram";
import TwitterLogo from "../../../../../icons/Twitter";
import GithubStarComponent from "../GithubStarButton";
import {
  HeaderMenu,
  HeaderMenuItemButton,
  HeaderMenuItemLink,
  HeaderMenuItems,
  HeaderMenuItemsSection,
  HeaderMenuToggle,
} from "../HeaderMenu";
import { ProfileIcon } from "../ProfileIcon";
import ThemeButtons from "../ThemeButtons";

export const AccountMenu = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCustomFeatureFlagsOpen, setIsCustomFeatureFlagsOpen] =
    useState(false);
  const { customParam: id } = useParams();
  const version = useDarkStore((state) => state.version);
  const { dark } = useTheme();
  const navigate = useCustomNavigate();
  const { mutate: mutationLogout } = useLogout();

  const { isAdmin, autoLogin } = useAuthStore((state) => ({
    isAdmin: state.isAdmin,
    autoLogin: state.autoLogin,
  }));

  const handleLogout = () => {
    mutationLogout();
  };

  return (
    <>
      <HeaderMenu>
        <HeaderMenuToggle>
          <div
            className="h-7 w-7 rounded-lg focus-visible:outline-0"
            data-testid="user-profile-settings"
          >
            {/* {ENABLE_DATASTAX_LANGFLOW ? <CustomProfileIcon /> : <ProfileIcon />} */}
            <ProfileIcon />
          </div>
        </HeaderMenuToggle>
        <HeaderMenuItems position="right">
          {/* {ENABLE_DATASTAX_LANGFLOW && (
            <HeaderMenuItemsSection>
              <CustomHeaderMenuItemsTitle />
            </HeaderMenuItemsSection>
          )} */}
          <HeaderMenuItemsSection>
            <div className="flex h-[46px] w-full items-center justify-between px-3">
              {/* {!ENABLE_DATASTAX_LANGFLOW && <ThemeButtons />} */}
              <ThemeButtons />
            </div>
            <HeaderMenuItemButton
              icon="arrow-right"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <span
                data-testid="menu_settings_button"
                id="menu_settings_button"
              >
                Settings
              </span>
            </HeaderMenuItemButton>
            {/* {ENABLE_DATASTAX_LANGFLOW ? (
              <HeaderMenuItemLink newPage href={`/settings/org/${id}/overview`}>
                Account Settings
              </HeaderMenuItemLink>
            ) : (
              <HeaderMenuItemButton
                icon="arrow-right"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <span
                  data-testid="menu_settings_button"
                  id="menu_settings_button"
                >
                  Settings
                </span>
              </HeaderMenuItemButton>
            )} */}
            {!ENABLE_DATASTAX_LANGFLOW && (
              <>
                {isAdmin && !autoLogin && (
                  <HeaderMenuItemButton onClick={() => navigate("/admin")}>
                    <span
                      data-testid="menu_admin_button"
                      id="menu_admin_button"
                    >
                      Admin Page
                    </span>
                  </HeaderMenuItemButton>
                )}
              </>
            )}

            <HeaderMenuItemLink newPage href="https://docs.langflow.org">
              <span data-testid="menu_docs_button" id="menu_docs_button">
                Docs
              </span>
            </HeaderMenuItemLink>
            {/* {ENABLE_DATASTAX_LANGFLOW ? (
              <>
                <HeaderMenuItemButton onClick={() => setIsFeedbackOpen(true)}>
                  <span
                    data-testid="menu_feedback_button"
                    id="menu_feedback_button"
                  >
                    Feedback
                  </span>
                </HeaderMenuItemButton>
                <CustomFeatureFlagMenuItems
                  onClick={() => setIsCustomFeatureFlagsOpen(true)}
                />
              </>
            ) : (
              <HeaderMenuItemLink newPage href="https://docs.langflow.org">
                <span data-testid="menu_docs_button" id="menu_docs_button">
                  Docs
                </span>
              </HeaderMenuItemLink>
            )} */}
          </HeaderMenuItemsSection>
          <HeaderMenuItemsSection>
            <HeaderMenuItemLink
              newPage
              href="https://www.linkedin.com/company/verbilio/"
            >
              <span data-testid="menu_github_button" id="menu_github_button">
                Share Feedback on LinkedIn
              </span>
            </HeaderMenuItemLink>
            {/* {ENABLE_DATASTAX_LANGFLOW ? (
              <HeaderMenuItemLink
                newPage
                href="https://github.com/langflow-ai/langflow"
              >
                <div className="-my-2 mr-2 flex w-full items-center justify-between">
                  <div className="text-sm">Star the repo</div>
                  <GithubStarComponent />
                </div>
              </HeaderMenuItemLink>
            ) : (
              <HeaderMenuItemLink
                newPage
                href="https://github.com/langflow-ai/langflow/discussions"
              >
                <span data-testid="menu_github_button" id="menu_github_button">
                  Share Feedback on Github
                </span>
              </HeaderMenuItemLink>
            )} */}
            {/* <HeaderMenuItemLink newPage href="https://x.com/verbilio">
              <span data-testid="menu_twitter_button" id="menu_twitter_button">
                Follow Verbilio on X
              </span>
            </HeaderMenuItemLink> */}
            <HeaderMenuItemLink newPage href="https://discord.gg/8gqysUMX">
              <span data-testid="menu_discord_button" id="menu_discord_button">
                Join the Verbilio Discord
              </span>
            </HeaderMenuItemLink>
          </HeaderMenuItemsSection>

          <HeaderMenuItemsSection>
            <span
              className="mb-2 flex items-center gap-2 px-4 pt-3 text-sm text-gray-300"
              data-testid="menu_discord_button"
              id="menu_discord_button"
            >
              Follow us on <GoLinkExternal />
            </span>

            <div className="my-4 flex items-center gap-3 px-4">
              <HeaderMenuItemLink
                newPage
                icon={null}
                className="w-auto !p-0"
                href="https://www.instagram.com/verbilioai"
              >
                <InstagramIcon size={20} color={dark ? "#fff" : "#000"} />
              </HeaderMenuItemLink>

              <HeaderMenuItemLink
                newPage
                className="w-auto !p-0"
                icon={null}
                href="https://www.facebook.com/people/Verbilio/61574963685631/"
              >
                <FacebookIcon size={20} color={dark ? "#fff" : "#000"} />
              </HeaderMenuItemLink>

              <HeaderMenuItemLink
                newPage
                className="w-auto !p-0"
                href="https://x.com/verbilio"
                icon={null}
              >
                <TwitterLogo size={20} color={dark ? "#fff" : "#000"} />
              </HeaderMenuItemLink>
            </div>
          </HeaderMenuItemsSection>

          <HeaderMenuItemsSection>
            <HeaderMenuItemButton onClick={handleLogout} icon="log-out">
              Logout
            </HeaderMenuItemButton>
          </HeaderMenuItemsSection>

          {/* {ENABLE_DATASTAX_LANGFLOW ? (
            <HeaderMenuItemsSection>
              <HeaderMenuItemLink href="/session/logout" icon="log-out">
                Logout
              </HeaderMenuItemLink>
            </HeaderMenuItemsSection>
          ) : (
            !autoLogin && (
              <HeaderMenuItemsSection>
                <HeaderMenuItemButton onClick={handleLogout} icon="log-out">
                  Logout
                </HeaderMenuItemButton>
              </HeaderMenuItemsSection>
            )
          )} */}
        </HeaderMenuItems>
      </HeaderMenu>
      <CustomFeedbackDialog
        isOpen={isFeedbackOpen}
        setIsOpen={setIsFeedbackOpen}
      />
      <CustomFeatureFlagDialog
        isOpen={isCustomFeatureFlagsOpen}
        setIsOpen={setIsCustomFeatureFlagsOpen}
      />
    </>
  );
};
