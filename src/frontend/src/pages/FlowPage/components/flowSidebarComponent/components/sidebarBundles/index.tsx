import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { memo, useMemo } from "react";
import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../components/ui/accordion";
import { cn } from "../../../../../../utils/utils";
import { SidebarGroupProps } from "../../types";
import { BundleItem } from "../bundleItems";

export const MemoizedSidebarGroup = memo(
  ({
    BUNDLES,
    search,
    sortedCategories,
    dataFilter,
    nodeColors,
    onDragStart,
    sensitiveSort,
    openCategories,
    setOpenCategories,
    handleKeyDownInput,
    uniqueInputsComponents,
    isAppOpen,
    toggleIsAppOpen,
  }: SidebarGroupProps) => {
    const sortedBundles = useMemo(() => {
      return BUNDLES.toSorted((a, b) => {
        const referenceArray = search !== "" ? sortedCategories : BUNDLES;
        return (
          referenceArray.findIndex((value) => value === a.name) -
          referenceArray.findIndex((value) => value === b.name)
        );
      });
    }, [BUNDLES, search, sortedCategories]);

    const isAnyCategoryOpen = useMemo(() => {
      return sortedBundles.some((item) => openCategories.includes(item.name));
    }, [sortedBundles, openCategories]);

    return (
      <SidebarGroup className="p-3">
        <SidebarGroupContent>
          <Accordion
            onClick={() => toggleIsAppOpen && toggleIsAppOpen()}
            value={isAppOpen ? "item-1" : isAnyCategoryOpen ? "item-1" : ""}
            className={cn("AccordionRoot !border-0")}
            type="single"
          >
            <AccordionItem
              className="AccordionItem w-full flex-1 !border-0"
              value="item-1"
            >
              <SidebarMenuButton>
                <AccordionTrigger
                  icon={
                    <ForwardedIconComponent
                      name="ChevronRight"
                      className="-mr-1 h-4 w-4 text-muted-foreground transition-all group-aria-expanded/collapsible:rotate-90"
                    />
                  }
                  className="[&[data-state=open]>svg]:rotate-90"
                  asChild
                >
                  <span className="w-full flex-1 group-aria-expanded/collapsible:font-semibold">
                    Apps
                  </span>
                </AccordionTrigger>
              </SidebarMenuButton>
              <AccordionContent>
                <SidebarMenu>
                  {sortedBundles.map((item) => (
                    <BundleItem
                      key={item.name}
                      item={item}
                      isOpen={openCategories.includes(item.name)}
                      onOpenChange={(isOpen) => {
                        setOpenCategories((prev) =>
                          isOpen
                            ? [...prev, item.name]
                            : prev.filter((cat) => cat !== item.name),
                        );
                      }}
                      dataFilter={dataFilter}
                      nodeColors={nodeColors}
                      uniqueInputsComponents={uniqueInputsComponents}
                      onDragStart={onDragStart}
                      sensitiveSort={sensitiveSort}
                      handleKeyDownInput={handleKeyDownInput}
                    />
                  ))}
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  },
);

MemoizedSidebarGroup.displayName = "MemoizedSidebarGroup";

export default MemoizedSidebarGroup;
