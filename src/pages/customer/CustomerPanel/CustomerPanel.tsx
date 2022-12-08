import { Box, Container, Tabs } from "@mui/material";
import { Tab } from "common/components/Tab";
import { tabsStyles } from "common/components/Tabs/styles";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { useState } from "react";
import { localization } from "resources";

import { OrdersPanel } from "./components/OrdersPanel";
import { CustomerPanelTab } from "./CourierPanelTab";

import styles from './CustomerPanel.module.scss';

const customerPanelTabToLabel: Record<CustomerPanelTab, () => string> = {
    [CustomerPanelTab.Orders]: () => localization.orders,
};

const customerPanelTabToTabElement: Record<CustomerPanelTab, () => React.ReactNode> = {
    [CustomerPanelTab.Orders]: () => <OrdersPanel />,
};

const customerPanelTabs = getEnumMembers(CustomerPanelTab).filter(Number.isFinite) as CustomerPanelTab[];

export function CustomerPanel() {
    const [tab, setTab] = useState<CustomerPanelTab>(CustomerPanelTab.Orders);


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
                    {customerPanelTabs.map(t => (
                        <Tab
                            key={t}
                            label={customerPanelTabToLabel[t]()}
                            value={t}
                        />
                    ))}
                </Tabs>
            </Box>
            <div className={styles['customer-panel-body']}>
                {customerPanelTabToTabElement[tab]()}
            </div>
        </Container>
    );
}