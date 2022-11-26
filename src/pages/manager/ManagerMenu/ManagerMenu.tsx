import { useState } from "react";
import { Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { localization } from "resources";

import { Button } from "common/components/Button";
import { useSelectedMenuType } from "common/hooks/useSelectedMenuType";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { useProducts } from "common/helpers/products/useProducts";
import { ProductItem } from "common/components/ProductItem";

import { CreateProductForm } from './components/ProductForms/CreateProductForm';
import { EditProductForm } from "./components/ProductForms/EditProductForm";

import styles from './ManagerMenu.module.scss';
import { Product } from "models/domain/Product";
import { useDelayedFlag } from "common/hooks/useDelayedFlag";
import { ConfirmationDialog } from "common/components/ConfirmationDialog";
import { useDeleteProduct } from "common/helpers/manager/useDeleteProduct";



export function ManagerMenu() {
    const selectedType = useSelectedMenuType();

    const [manageProduct, setManageProduct] = useState<Product>();
    const [isCreateProductFormModalOpen, setIsCreateProductFormModalOpen] = useState<boolean>(false);
    const [isEditProductFormModalOpen, setIsEditProductFormModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const [products, isLoading] = useProducts(selectedType, [isCreateProductFormModalOpen, isEditProductFormModalOpen, isDeleteDialogOpen]);
    const [onDeleteProduct] = useDeleteProduct(() => setIsDeleteDialogOpen(false));
    const isProductsLoading = useDelayedFlag(200, [isLoading]);

    const renderProductItemActions = (product: Product) => (
        <div className={styles['product-item-actions']}>
            <Button
                onClick={() => setIsDeleteDialogOpen(true)}
            >
                {localization.delete}
            </Button>
            <Button
                filled
                onClick={() => {
                    setIsEditProductFormModalOpen(true);
                    setManageProduct(product);
                }}
            >
                {localization.edit}
            </Button>
        </div>
    );

    const renderBody = () => {
        if (isProductsLoading) {
            return (
                <div className={styles['manager-menu-stub']}>
                    {localization.loading}
                </div>
            )
        }

        if (products?.length === 0) {
            return (
                <div className={styles['manager-menu-stub']}>
                    {localization.thereAreNoProductsOfType(getStringByProductType(selectedType!))}
                </div>
            );
        }

        return (
            <div className={styles['manager-menu-body']}>
                {products.map(p => (
                    <ProductItem
                        key={p.id}
                        product={p}
                        actions={renderProductItemActions(p)}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <Container component='section'>
                <div className={styles['manager-menu']}>
                    <div className={styles['manager-menu-header']}>
                        <Button
                            filled
                            onClick={() => setIsCreateProductFormModalOpen(true)}
                        >
                            <AddIcon />
                            {localization.add}
                        </Button>
                    </div>
                    {renderBody()}
                </div>
            </Container>
            <CreateProductForm
                isModalOpen={isCreateProductFormModalOpen}
                productType={selectedType!}
                onClose={() => setIsCreateProductFormModalOpen(false)}
                onSuccessfulCreate={() => setIsCreateProductFormModalOpen(false)}
            />
            <EditProductForm
                product={manageProduct}
                isModalOpen={isEditProductFormModalOpen}
                productType={selectedType!}
                onClose={() => setIsEditProductFormModalOpen(false)}
                onSuccessfulEdit={() => setIsEditProductFormModalOpen(false)}
            />
            <ConfirmationDialog
                title={localization.areYouSureYouWantToDelete}
                isDialogOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onNo={() => setIsDeleteDialogOpen(false)}
                onYes={() => onDeleteProduct(manageProduct?.id ?? '')}
            />
        </>
    );
}