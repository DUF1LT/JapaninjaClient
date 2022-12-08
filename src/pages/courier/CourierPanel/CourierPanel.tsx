import { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";

import { localization } from "resources";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { tabsStyles } from "common/components/Tabs/styles";

import { CourierPanelTab } from "./CourierPanelTab";
import { OrdersPanel } from "./components/OrdersPanel";

import styles from './CourierPanel.module.scss';

const courierPanelTabToLabel: Record<CourierPanelTab, () => string> = {
    [CourierPanelTab.Orders]: () => localization.orders,
};

const courierPanelTabToTabElement: Record<CourierPanelTab, () => React.ReactNode> = {
    [CourierPanelTab.Orders]: () => <OrdersPanel />,
};

const courierPanelTabs = getEnumMembers(CourierPanelTab).filter(Number.isFinite) as CourierPanelTab[];

export function CourierPanel() {
    const [tab, setTab] = useState<CourierPanelTab>(CourierPanelTab.Orders);

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
                    {courierPanelTabs.map(t => (
                        <Tab
                            key={t}
                            label={courierPanelTabToLabel[t]()}
                            value={t}
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