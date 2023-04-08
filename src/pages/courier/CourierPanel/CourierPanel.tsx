import { useState } from "react";
import { Box, Container, Tabs } from "@mui/material";

import { localization } from "resources";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { tabsStyles } from "common/components/Tabs/styles";

import { CourierPanelTab } from "./CourierPanelTab";
import { OrdersPanel } from "./components/OrdersPanel";
import { CourierProfile } from "./components/CourierProfile";

import styles from './CourierPanel.module.scss';
import { Tab } from "common/components/Tab";

const courierPanelTabToLabel: Record<CourierPanelTab, () => string> = {
    [CourierPanelTab.Profile]: () => localization.profile,
    [CourierPanelTab.Orders]: () => localization.orders,
};

const courierPanelTabToTabElement: Record<CourierPanelTab, () => React.ReactNode> = {
    [CourierPanelTab.Profile]: () => <CourierProfile />,
    [CourierPanelTab.Orders]: () => <OrdersPanel />,
};

const courierPanelTabs = getEnumMembers(CourierPanelTab).filter(Number.isFinite) as CourierPanelTab[];

export function CourierPanel() {
    const [tab, setTab] = useState<CourierPanelTab>(CourierPanelTab.Profile);

    return (
        <Container>
            <Box className={styles.tabs}>
                <Tabs
                    sx={tabsStyles}
                    value={tab}
                    centered
                    TabIndicatorProps={{
                        hidden: true,
                    }}
                    variant="fullWidth"
                    onChange={(_, v) => setTab(v)}
                >
                    {courierPanelTabs.map((t, i) => (
                        <Tab
                            key={t}
                            label={courierPanelTabToLabel[t]()}
                            value={t}
                            isFirst={i === 0}
                            isLast={i === courierPanelTabs.length - 1}
                        />
                    ))}
                </Tabs>
            </Box>
            <div className={styles['courier-panel-body']}>
                {courierPanelTabToTabElement[tab]()}
            </div>
        </Container>
    );
}