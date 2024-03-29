import { useState } from "react";
import { Box, Container, Tabs } from "@mui/material";

import { localization } from "resources";

import { Tab } from "common/components/Tab";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { tabsStyles } from "common/components/Tabs/styles";

import { ManagerPanelTab } from "./ManagerPanelTab";
import { CouriersPanel } from "./components/CouriersPanel";
import { OrdersPanel } from "./components/OrdersPanel";

import styles from './ManagerPanel.module.scss';


const managerPanelTabToLabel: Record<ManagerPanelTab, () => string> = {
    [ManagerPanelTab.Couriers]: () => localization.couriers,
    [ManagerPanelTab.Orders]: () => localization.orders,
};

const managerPanelTabToTabElement: Record<ManagerPanelTab, () => React.ReactNode> = {
    [ManagerPanelTab.Couriers]: () => <CouriersPanel />,
    [ManagerPanelTab.Orders]: () => <OrdersPanel />,
};

const managerPanelTabs = getEnumMembers(ManagerPanelTab).filter(Number.isFinite) as ManagerPanelTab[];

export function ManagerPanel() {
    const [tab, setTab] = useState<ManagerPanelTab>(ManagerPanelTab.Orders);

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
                    {managerPanelTabs.map((t, i) => (
                        <Tab
                            key={t}
                            label={managerPanelTabToLabel[t]()}
                            value={t}
                            isFirst={i === 0}
                            isLast={i === managerPanelTabs.length - 1}
                        />
                    ))}
                </Tabs>
            </Box>
            <div className={styles['manager-panel-body']}>
                {managerPanelTabToTabElement[tab]()}
            </div>
        </Container>
    );
}