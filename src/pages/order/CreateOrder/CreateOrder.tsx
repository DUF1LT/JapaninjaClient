import { Container } from '@mui/material';

import { useCart } from 'common/helpers/cart/useCart';
import { localization } from 'resources';
import { OrderConfiguration } from 'models/domain/OrderConfiguration';

import { OrderProductsSection } from './components/OrderProductsSection';
import { OrderSummaryPopup } from './components/OrderSummaryPopup';
import { CutlertyItem } from './components/CutleryItem';
import { OrderInfoForm } from './components/OrderInfoForm';
import { CreateOrderContextProvider } from './context/CreateOrderContextProvider';
import { useCreateOrder } from 'common/helpers/order/useCreateOrder';

import styles from './CreateOrder.module.scss';
import { OrderInfoFormPayload } from './types';
import { CreateOrderPayload } from 'services/OrdersService';
import { useAppSelector } from 'store/hooks';


interface Props {
    orderConfiguration: OrderConfiguration;
}

export function CreateOrder({
    orderConfiguration,
}: Props) {
    const { cart, cartSum } = useCart();
    const authData = useAppSelector(s => s.auth.authData);
    const { onCreateOrder, error, isLoading } = useCreateOrder();

    const onOrderInfoFormSubmit = (orderInfoPayload: OrderInfoFormPayload) => {
        const createOrderPayload: CreateOrderPayload = {
            customerId: authData.id,
            products: cart.products.map(p => ({
                productId: p.product.id,
                amount: p.amount,
            })),
            cutlery: cart.cutlery.map(c => ({
                cutleryId: c.cutlery.id,
                amount: c.amount,
            })),
            ...orderInfoPayload,
            deliveryTime: orderInfoPayload.deliveryTime != null ? orderInfoPayload.deliveryTime.format() : null
        };

        onCreateOrder(createOrderPayload);
    };

    return (
        <CreateOrderContextProvider>
            <Container>
                <div className={styles['create-order-page']}>
                    <div className={styles['order-content']}>
                        <div className={styles['order-content-section']}>
                            <span className={styles['order-content-title']}>
                                {localization.yourOrder}
                            </span>
                            <OrderProductsSection
                                cartProducts={cart.products}
                            />
                        </div>
                        <div className={styles['order-content-section']}>
                            <span className={styles['order-content-title']}>
                                {localization.cutlery}
                            </span>
                            <div className={styles['order-cutlery']}>
                                {cart.cutlery.map(c => (
                                    <CutlertyItem
                                        key={c.cutlery.id}
                                        cartCutlery={c}
                                    />
                                ))}
                            </div>
                        </div>
                        <OrderInfoForm
                            onSubmit={onOrderInfoFormSubmit}
                            orderConfiguration={orderConfiguration}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                    <OrderSummaryPopup
                        cartSum={cartSum}
                        deliveryPrice={orderConfiguration?.deliveryPrice ?? 0}
                        minDeliveryFreePrice={orderConfiguration?.minDeliveryFreePrice ?? 0}
                    />
                </div>
            </Container >
        </CreateOrderContextProvider>
    );
}